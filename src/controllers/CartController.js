import ProductController from './ProductController';
import CartItemModel from '../models/CartItemModel'; 

let cartItems = []; 

class CartController {
  
  static async getCart() {
    return new Promise(resolve => {
      setTimeout(() => {
        const itemsWithTotals = cartItems.map(item => {
           if (item instanceof CartItemModel) {
             return item;
           }
           return new CartItemModel(item.product, item.quantity);
        });
        resolve(itemsWithTotals);
      }, 50); 
    });
  }

  static async addItem(productId) {
    const allProducts = await ProductController.getAllProducts();
    const productToAdd = allProducts.find(p => p.id === productId);

    if (!productToAdd) return;

    const existingItemIndex = cartItems.findIndex(item => item.product.id === productId);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push(new CartItemModel(productToAdd, 1));
    }
    
    return this.getCart();
  }

  // --- NOVO: Atualizar Quantidade (+ ou -) ---
  static async updateQuantity(productId, delta) {
    const index = cartItems.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      const newQuantity = cartItems[index].quantity + delta;
      // Se for maior que 0, atualiza. Se for 0, não faz nada (deixa o usuário clicar em excluir)
      if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
      }
    }
    return this.getCart();
  }

  // --- NOVO: Remover Item ---
  static async removeItem(productId) {
    cartItems = cartItems.filter(item => item.product.id !== productId);
    return this.getCart();
  }
  
  static getCount() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  static clearCart() {
    cartItems = []; 
    return Promise.resolve([]);
  }
}

export default CartController;