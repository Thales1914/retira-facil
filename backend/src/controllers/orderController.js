const db = require('../config/db');

const orderController = {

  createOrder: async (req, res) => {
    const { usuario, itens, agendamento } = req.body;

    if (!usuario || !itens || !agendamento || itens.length === 0) {
      return res.status(400).json({ message: 'Dados do pedido incompletos.' });
    }

    const client = await db.query('BEGIN');

    try {
      let { rows: clienteRows } = await db.query(
        'SELECT id_cliente FROM cliente WHERE email = $1',
        [usuario.email]
      );
      
      let clienteId;
      if (clienteRows.length > 0) {
        clienteId = clienteRows[0].id_cliente;
      } else {
        const { rows: newCliente } = await db.query(
          'INSERT INTO cliente (nome, telefone, email) VALUES ($1, $2, $3) RETURNING id_cliente',
          [usuario.nome, usuario.matricula, usuario.email]
        );
        clienteId = newCliente[0].id_cliente;
      }

      const { rows: pedidoRows } = await db.query(
        `INSERT INTO pedido (id_cliente, data_retirada_agendada, horario_retirada_agendado, status_pedido)
         VALUES ($1, $2, $3, 'Recebido')
         RETURNING id_pedido`,
        [clienteId, agendamento.day, agendamento.time]
      );
      const pedidoId = pedidoRows[0].id_pedido;

      const itemQueries = itens.map(item => {
        const sql = `
          INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario_no_pedido)
          VALUES ($1, $2, $3, $4)
        `;
        const params = [pedidoId, item.product.id, item.quantity, item.product.preco];
        return db.query(sql, params);
      });

      await Promise.all(itemQueries);

      await db.query('COMMIT');
      
      res.status(201).json({ 
        message: 'Pedido criado com sucesso!', 
        pedidoId: pedidoId,
        clienteId: clienteId 
      });

    } catch (err) {
      await db.query('ROLLBACK');
      console.error('Erro ao criar pedido:', err.stack);
      res.status(500).json({ message: 'Erro interno do servidor ao criar pedido.' });
    }
  },


};

module.exports = orderController;