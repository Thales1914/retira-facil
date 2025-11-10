
import React from 'react';
import CartItem from '../../../components/Cliente/CartItem';
import ProductModel from '../../../models/ProductModel';

const mockCartData = [
  {
    product: new ProductModel({
      id: 'a1b2c3d4-1',
      nome: 'Mochila Escolar',
      categoria: 'Acessórios',
      preco: 129.90,
      estoque: 24,
      imageUrl: '/assets/images/mochila.jpg'
    }),
    quantity: 1,
    totalPrice: 129.90,
  }
];

function Carrinho() {
  const total = mockCartData.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="carrinho-page">
      <header className="page-header-simple">
        <button onClick={() => window.history.back()} className="back-button">← Voltar</button>
        <h1 className="page-title">Carrinho</h1>
      </header>

      <main className="carrinho-main-content">
        {mockCartData.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}

        <div className="carrinho-summary-fixed">
          <div className="total-bar">
            <span className="total-label">Total</span>
            <span className="total-amount">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <button className="btn-continue">Continuar</button>
        </div>
      </main>
    </div>
  );
}

export default Carrinho;