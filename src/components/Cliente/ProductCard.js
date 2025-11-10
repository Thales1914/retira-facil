
import React from 'react';

function ProductCard({ product, onAdd }) {
  const { nome, categoria, imageUrl, preco } = product;
  const formattedPrice = product.getFormattedPrice(); 

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={imageUrl} alt={nome} className="product-image" />
      </div>
      
      <div className="product-details">
        <p className="product-category">{categoria.toUpperCase()}</p>
        <h3 className="product-name">{nome}</h3>
        <p className="product-price">{formattedPrice}</p>
      </div>
      
      <button 
        className="btn-add-to-cart" 
        onClick={() => onAdd(product)}
      >
        + Adicionar
      </button>

    </div>
  );
}

export default ProductCard;