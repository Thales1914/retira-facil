
import ProductModel from '../models/ProductModel';

const MOCK_PRODUCTS_DATA = [
  {
    id: 'a1b2c3d4-1',
    nome: 'Mochila Escolar',
    categoria: 'Acessórios',
    preco: 129.90,
    estoque: 24,
    descricao: 'Mochila resistente com compartimento para notebook',
    imageUrl: '/assets/images/mochila.jpg'
  },
  {
    id: 'e5f6g7h8-2',
    nome: 'Uniforme Completo',
    categoria: 'Uniformes',
    preco: 89.90,
    estoque: 30,
    descricao: 'Camisa polo e calça do uniforme oficial',
    imageUrl: '/assets/images/uniforme.jpg'
  },
  {
    id: 'i9j0k1l2-3',
    nome: 'Kit Cadernos',
    categoria: 'Material Escolar',
    preco: 45.00,
    estoque: 40,
    descricao: 'Conjunto com 5 cadernos universitários',
    imageUrl: '/assets/images/cadernos.jpg'
  },
  {
    id: 'm3n4o5p6-4',
    nome: 'Estojo Completo',
    categoria: 'Material Escolar',
    preco: 35.00,
    estoque: 35,
    descricao: 'Estojo com canetas, lápis e material de desenho',
    imageUrl: '/assets/images/estojo.jpg'
  }
];

class ProductController {
  static getAllProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = MOCK_PRODUCTS_DATA.map(data => new ProductModel(data));
        resolve(products);
      }, 100); 
    });
  }
}
export default ProductController;