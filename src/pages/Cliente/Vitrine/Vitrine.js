import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductController from '../../../controllers/ProductController';
import CartController from '../../../controllers/CartController';
import ProductCard from '../../../components/Cliente/ProductCard';

function Vitrine() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');

  useEffect(() => {
    ProductController.getAllProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
    setCartCount(CartController.getCount());
  }, []);

  const handleAddToCart = async (product) => {
    await CartController.addItem(product.id);
    setCartCount(CartController.getCount());
  };

  const categoriasDisponiveis = ['Todos', ...new Set(products.map(p => p.categoria))];

  const produtosFiltrados = filtroCategoria === 'Todos'
    ? products
    : products.filter(p => p.categoria === filtroCategoria);

  return (
    <div className="bg-light min-vh-100">

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
        <div className="container">
          <span className="navbar-brand mb-0 h1 fw-bold">
            🎓 Retira Fácil
          </span>
          <div className="d-flex">
            <Link to="/carrinho" className="btn btn-light text-primary fw-bold rounded-pill position-relative">
              🛒 Carrinho
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <header className="hero-section shadow-sm py-5 text-center">
        <div className="hero-bg-circle" style={{ top: '-50px', left: '-50px' }}></div>
        <div className="hero-bg-circle" style={{ bottom: '-50px', right: '-50px', background: 'var(--secondary-gradient)' }}></div>

        <div className="container position-relative animate-fade-in">
          <h1 className="display-4 fw-bold text-dark mb-2">
            Uniforme <span className="text-primary">Escolar</span>
          </h1>
          <p className="lead text-muted mb-0">
            Reserve online e retire na escola sem filas.
          </p>
        </div>
      </header>

      <div className="container pb-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : (
          <>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <span className="me-2 fw-bold text-muted"><i className="bi bi-funnel-fill"></i> Categoria:</span>

                  { }
                  <select
                    className="form-select form-select-sm shadow-sm"
                    style={{ maxWidth: '200px', cursor: 'pointer' }}
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                  >
                    {categoriasDisponiveis.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              {produtosFiltrados.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                />
              ))}

              {produtosFiltrados.length === 0 && (
                <div className="col-12 text-center text-muted mt-5">
                  <p>Nenhum produto encontrado nesta categoria.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Vitrine;