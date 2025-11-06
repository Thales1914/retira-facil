// src/models/ProductModel.js
class ProductModel {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.categoria = data.categoria;
    this.preco = data.preco; // numeric(10,2)
    this.estoque = data.estoque; // integer
    this.descricao = data.descricao;
    this.imageUrl = data.imageUrl; // Adicionado para a View
  }

  getFormattedPrice() {
    return `R$ ${this.preco.toFixed(2).replace('.', ',')}`;
  }
}
export default ProductModel;