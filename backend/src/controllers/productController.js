// src/controllers/productController.js
const db = require('../config/db'); // Importa nossa conexão com o banco

const productController = {

  // Método para buscar TODOS os produtos (RF-1)
  getAllProducts: async (req, res) => {
    try {
      // Usa o 'db.query' que exportamos do db.js
      const { rows } = await db.query('SELECT * FROM produto ORDER BY nome ASC');
      
      // Renomeia colunas (ex: 'estoque_disponivel' para 'estoque') para bater com o front-end
      const products = rows.map(product => ({
        id: product.id,
        nome: product.nome,
        categoria: product.categoria,
        preco: parseFloat(product.preco), // Converte de NUMERIC para float
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

  // Método para criar um NOVO produto (RF-5)
  createProduct: async (req, res) => {
    try {
      // Pega os dados do produto do corpo (body) da requisição
      const { nome, categoria, preco, estoque, descricao, imageUrl } = req.body;

      // Validação simples (em um projeto real, isso seria mais robusto)
      if (!nome || !preco || !estoque) {
        return res.status(400).json({ message: 'Nome, preço e estoque são obrigatórios.' });
      }

      // SQL para inserir o novo produto
      const sql = `
        INSERT INTO produto (nome, categoria, preco, estoque_disponivel, descricao, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *; 
      `;

      const params = [nome, categoria, preco, estoque, descricao, imageUrl];

      // Executa o comando no banco
      const { rows } = await db.query(sql, params);

      // Retorna o produto que acabou de ser criado
      res.status(201).json(rows[0]);

    } catch (err) {
      console.error('Erro ao criar produto:', err.stack);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },
 // <-- VÍRGULA aqui depois do createProduct

  // Método para ATUALIZAR um produto (RF-5)
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params; // Pega o ID da URL (ex: /api/produtos/12345)
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

  // Método para DELETAR um produto (RF-5)
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params; // Pega o ID da URL

      const sql = 'DELETE FROM produto WHERE id = $1 RETURNING *;';
      const { rows } = await db.query(sql, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      // Retorna 204 (No Content) que é o padrão para delete, ou 200 com o item deletado
      res.status(200).json({ message: 'Produto deletado com sucesso.', deletedProduct: rows[0] });

    } catch (err) {
      console.error('Erro ao deletar produto:', err.stack);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

};

module.exports = productController;