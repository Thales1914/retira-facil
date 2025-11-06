// src/models/CartItemModel.js
// O ProductModel deve ser importado aqui se o JavaScript suportar injeção de dependência via construtor
// import ProductModel from './ProductModel'; 

class CartItemModel {
  /**
   * Representa um item único no carrinho de compras.
   * @param {object} product - O objeto produto (deve ser uma instância de ProductModel, mas aceitamos objeto puro para simplicidade inicial).
   * @param {number} quantity - A quantidade deste produto no carrinho.
   */
  constructor(product, quantity = 1) {
    if (!product || typeof quantity !== 'number' || quantity < 1) {
      throw new Error("Dados de CartItemModel inválidos.");
    }
    this.product = product;
    this.quantity = quantity;
  }

  // Método para calcular o preço total do item
  getTotalPrice() {
    return this.product.preco * this.quantity;
  }

  // Método para formatar o preço total para exibição
  getFormattedTotalPrice() {
    return `R$ ${this.getTotalPrice().toFixed(2).replace('.', ',')}`;
  }
}

export default CartItemModel;