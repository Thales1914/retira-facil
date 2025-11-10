// src/pages/Cliente/Vitrine/Vitrine.js
import React, { useState, useEffect } from 'react';
import ProductController from '../../../controllers/ProductController';
import ProductCard from '../../../components/Cliente/ProductCard';

function Vitrine() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductController.getAllProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao carregar produtos:", error);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    console.log(`Produto ${product.nome} adicionado ao carrinho.`);
  };

  return (
    <div className="vitrine-page">
      <header className="page-header">
        <div className="header-content">
          <h1 className="header-title">Uniforme Escolar</h1>
          <p className="header-subtitle">Uniformes e acessórios escolares</p>
        </div>
        <a href="/carrinho" className="cart-link">
          🛒 Carrinho (0)
        </a>
      </header>

      <main className="vitrine-main-content">
        {loading ? (
          <p className="loading-message">Carregando produtos...</p>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Vitrine;