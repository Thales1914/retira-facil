// src/controllers/CartController.js
import ProductController from './ProductController';
// O CartModel seria usado aqui, mas o criaremos a seguir.
// import CartModel from '../models/CartModel'; 

// Variável para simular o estado persistente do carrinho (enquanto não há Back-end/Context API)
let cartItems = [];

class CartController {
  
  // Função para simular o carregamento do carrinho (RF-2)
  static async getCart() {
    // Em um cenário real, isso faria uma chamada à API do Back-end.
    // Aqui, retornamos os itens simulados.
    return new Promise(resolve => {
      setTimeout(() => {
        // Mapeia os dados do carrinho (item, quantidade) para o formato final com o preço total
        const itemsWithTotals = cartItems.map(item => ({
          ...item,
          totalPrice: item.product.preco * item.quantity
        }));
        resolve(itemsWithTotals);
      }, 100);
    });
  }

  // Função para simular a adição de um produto ao carrinho (RF-2)
  static async addItem(productId) {
    // 1. Simula a busca do produto pelo ID (usando o ProductController)
    const allProducts = await ProductController.getAllProducts();
    const productToAdd = allProducts.find(p => p.id === productId);

    if (!productToAdd) {
      console.error("Produto não encontrado para adicionar ao carrinho.");
      return;
    }

    // 2. Lógica de adição: se já existe, incrementa; se não, adiciona
    const existingItemIndex = cartItems.findIndex(item => item.product.id === productId);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ product: productToAdd, quantity: 1 });
    }
    
    console.log(`Produto ${productToAdd.nome} adicionado/incrementado.`);
    return this.getCart();
  }

  // Lógica futura para remover, atualizar quantidade, etc.
}

export default CartController;

// **NOTA IMPORTANTE:** Para testar a View do Carrinho, você pode adicionar 
// um item inicial aqui para que a lista não comece vazia.

// Exemplo: Simular a adição inicial da Mochila Escolar ao carregar o Controller
// CartController.addItem('a1b2c3d4-1');