// src/components/Cliente/ProductCard.js
import React from 'react';
// Ícone de adição - você precisará instalar uma biblioteca como react-icons
// Ex: import { FiPlus } from 'react-icons/fi'; 

function ProductCard({ product, onAdd }) {
  const { nome, categoria, imageUrl, preco } = product;
  const formattedPrice = product.getFormattedPrice(); // Usa o método do Model

  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* Usamos a tag img com o caminho simulado */}
        <img src={imageUrl} alt={nome} className="product-image" />
      </div>
      
      <div className="product-details">
        <p className="product-category">{categoria.toUpperCase()}</p>
        <h3 className="product-name">{nome}</h3>
        <p className="product-price">{formattedPrice}</p>
      </div>
      
      {/* Botão primário azul, conforme o protótipo */}
      <button 
        className="btn-add-to-cart" 
        onClick={() => onAdd(product)}
      >
        {/* <FiPlus /> Adicionar */}
        + Adicionar
      </button>

      {/* Observação: o CSS deve ser implementado separadamente para replicar o visual com sombras, cores, e layout. */}
    </div>
  );
}

export default ProductCard;