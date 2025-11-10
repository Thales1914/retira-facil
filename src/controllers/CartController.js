
import ProductController from './ProductController';
let cartItems = [];

class CartController {
  
  static async getCart() {
    return new Promise(resolve => {
      setTimeout(() => {
        const itemsWithTotals = cartItems.map(item => ({
          ...item,
          totalPrice: item.product.preco * item.quantity
        }));
        resolve(itemsWithTotals);
      }, 100);
    });
  }

  static async addItem(productId) {
    const allProducts = await ProductController.getAllProducts();
    const productToAdd = allProducts.find(p => p.id === productId);

    if (!productToAdd) {
      console.error("Produto não encontrado para adicionar ao carrinho.");
      return;
    }

    const existingItemIndex = cartItems.findIndex(item => item.product.id === productId);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ product: productToAdd, quantity: 1 });
    }
    
    console.log(`Produto ${productToAdd.nome} adicionado/incrementado.`);
    return this.getCart();
  }

}

export default CartController;
