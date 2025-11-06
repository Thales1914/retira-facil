// src/pages/Cliente/Vitrine/Vitrine.js
import React, { useState, useEffect } from 'react';
import ProductController from '../../../controllers/ProductController';
import ProductCard from '../../../components/Cliente/ProductCard';

// **NOTA:** Você precisará criar e integrar os componentes Header (src/components/Common/Header.js) e App.css/styles

function Vitrine() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca dados simulados do Controller (RF-1)
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
    // Simulação da lógica de adicionar ao carrinho (RF-2)
    console.log(`Produto ${product.nome} adicionado ao carrinho.`);
    // Futuro: Chamar CartController
  };

  return (
    <div className="vitrine-page">
      {/* O cabeçalho com o link 'Carrinho (0)' - replicando o visual do protótipo */}
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