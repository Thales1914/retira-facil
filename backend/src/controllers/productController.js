const db = require('../config/db');

const productController = {

  getAllProducts: async (req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM produto ORDER BY nome ASC');
      
      const products = rows.map(product => ({
        id: product.id_produto,
        nome: product.nome,
        categoria: product.categoria,
        preco: parseFloat(product.preco), 
        estoque: product.estoque_disponivel,
        descricao: product.descricao,
        imageUrl: product.image_url,
      }));

      res.status(200).json(products);

    } catch (err) {
      console.error('Erro ao buscar produtos:', err.stack);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { nome, categoria, preco, estoque, descricao, imageUrl } = req.body;

      if (!nome || !preco || !estoque) {
        return res.status(400).json({ message: 'Nome, preço e estoque são obrigatórios.' });
      }

      const sql = `
        INSERT INTO produto (nome, categoria, preco, estoque_disponivel, descricao, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *; 
      `;

      const params = [nome, categoria, preco, estoque, descricao, imageUrl];

      const { rows } = await db.query(sql, params);

      res.status(201).json(rows[0]);

    } catch (err) {
      console.error('Erro ao criar produto:', err.stack);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, categoria, preco, estoque, descricao, imageUrl } = req.body;

      const sql = `
        UPDATE produto 
        SET 
          nome = $1, 
          categoria = $2, 
          preco = $3, 
          estoque_disponivel = $4, 
          descricao = $5, 
          image_url = $6
        WHERE id = $7
        RETURNING *;
      `;
      
      const params = [nome, categoria, preco, estoque, descricao, imageUrl, id];
      const { rows } = await db.query(sql, params);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      res.status(200).json(rows[0]);

    } catch (err) {
      console.error('Erro ao atualizar produto:', err.stack);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const sql = 'DELETE FROM produto WHERE id = $1 RETURNING *;';
      const { rows } = await db.query(sql, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      res.status(200).json({ message: 'Produto deletado com sucesso.', deletedProduct: rows[0] });

    } catch (err) {
      console.error('Erro ao deletar produto:', err.stack);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

};

module.exports = productController;