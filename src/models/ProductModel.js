
class ProductModel {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.categoria = data.categoria;
    this.preco = data.preco; 
    this.estoque = data.estoque;
    this.descricao = data.descricao;
    this.imageUrl = data.imageUrl; 
  }

  getFormattedPrice() {
    return `R$ ${this.preco.toFixed(2).replace('.', ',')}`;
  }
}
export default ProductModel;