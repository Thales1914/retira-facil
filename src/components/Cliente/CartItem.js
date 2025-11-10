
import React from 'react';

function CartItem({ item }) {
  const { product, quantity, totalPrice } = item; 

  return (
    <div className="cart-item-card">
      <div className="item-details">

        <img src={product.imageUrl} alt={product.nome} className="item-image" />
        
        <div className="item-info">
          <h4 className="item-name">{product.nome}</h4>
          <p className="item-price-unit">{product.getFormattedPrice()}</p>
          
          <div className="item-quantity-control">
            <button className="qty-button">-</button>
            <span className="qty-display">{quantity}</span>
            <button className="qty-button">+</button>
          </div>
        </div>
      </div>

      <div className="item-actions">
        <button className="remove-button">🗑️</button> 
        <p className="item-total-price">R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
      </div>
    </div>
  );
}

export default CartItem;