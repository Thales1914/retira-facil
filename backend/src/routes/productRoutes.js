const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define a rota GET para /produtos
// :id indica que é um parâmetro na URL
// RF-1: Navegação e visualização do catálogo
router.get('/produtos', productController.getAllProducts);
//RF-5: Gerenciamento de Produtos (C - Create)
router.post('/produtos', productController.createProduct);
// RF-5: Gerenciamento de Produtos (U - Update)
router.put('/produtos/:id', productController.updateProduct);
// RF-5: Gerenciamento de Produtos (D - Delete)
router.delete('/produtos/:id', productController.deleteProduct);


module.exports = router;