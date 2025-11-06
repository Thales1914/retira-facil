// src/components/Cliente/CartItem.js
import React from 'react';

function CartItem({ item }) {
  // item é um objeto que contém o product (ProductModel) e a quantidade
  const { product, quantity, totalPrice } = item; 

  return (
    <div className="cart-item-card">
      <div className="item-details">
        {/* Imagem do produto */}
        <img src={product.imageUrl} alt={product.nome} className="item-image" />
        
        <div className="item-info">
          <h4 className="item-name">{product.nome}</h4>
          <p className="item-price-unit">{product.getFormattedPrice()}</p>
          
          {/* Controle de Quantidade */}
          <div className="item-quantity-control">
            <button className="qty-button">-</button>
            <span className="qty-display">{quantity}</span>
            <button className="qty-button">+</button>
          </div>
        </div>
      </div>

      <div className="item-actions">
        {/* Ícone de Excluir */}
        <button className="remove-button">🗑️</button> 
        {/* Preço total do item */}
        <p className="item-total-price">R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
      </div>
    </div>
  );
}

export default CartItem;