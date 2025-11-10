
class CartItemModel {
  /**
   
   * @param {object} product 
   * @param {number} quantity 
   */
  constructor(product, quantity = 1) {
    if (!product || typeof quantity !== 'number' || quantity < 1) {
      throw new Error("Dados de CartItemModel inválidos.");
    }
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.preco * this.quantity;
  }

  getFormattedTotalPrice() {
    return `R$ ${this.getTotalPrice().toFixed(2).replace('.', ',')}`;
  }
}

export default CartItemModel;