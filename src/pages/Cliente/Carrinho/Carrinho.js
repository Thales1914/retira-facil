import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../../components/Cliente/CartItem';
import CartController from '../../../controllers/CartController';

function Carrinho() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //recarregar dados
  const refreshCart = () => {
    CartController.getCart().then(items => {
      setCartItems(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  //CartItem
  const handleUpdateQuantity = async (productId, delta) => {
    await CartController.updateQuantity(productId, delta);
    refreshCart();
  };

  const handleRemoveItem = async (productId) => {
    await CartController.removeItem(productId);
    refreshCart();
  };

  
  const totalGeral = cartItems.reduce((acc, item) => {
    return acc + (item.product.preco * item.quantity);
  }, 0);

  return (
    <div className="bg-light min-vh-100 pb-5">
      
     
      <div className="bg-white shadow-sm py-4 mb-4">
        <div className="container d-flex align-items-center">
          <Link to="/" className="btn btn-light text-primary rounded-circle shadow-sm me-3" style={{width: '40px', height: '40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <i className="bi bi-arrow-left fw-bold"></i>
          </Link>
          <h4 className="mb-0 fw-bold font-poppins">Seu Carrinho</h4>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
        ) : cartItems.length === 0 ? (
         
          <div className="text-center py-5 animate-fade-in">
            <div style={{ fontSize: '4rem' }}>🛒</div>
            <h3 className="fw-bold mt-3">Seu carrinho está vazio</h3>
            <p className="text-muted">Parece que você ainda não escolheu nada.</p>
            <Link to="/" className="btn btn-gradient rounded-pill px-4 mt-3 shadow">
              Voltar para a Loja
            </Link>
          </div>
        ) : (
       
          <div className="row">
            <div className="col-lg-8 mb-4">
              {cartItems.map((item, index) => (
                <CartItem 
                  key={index} 
                  item={item} 
                  onUpdate={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm p-4 position-sticky" style={{ top: '100px' }}>
                <h5 className="fw-bold mb-4">Resumo do Pedido</h5>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-bold">R$ {totalGeral.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Taxa de Retirada</span>
                  <span className="text-success fw-bold">Grátis</span>
                </div>
                
                <hr className="my-3" />
                
                <div className="d-flex justify-content-between mb-4 align-items-center">
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-4 text-primary">
                    R$ {totalGeral.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <Link to="/agendamento" className="btn btn-success w-100 py-3 fw-bold shadow rounded-3">
                  Agendar Retirada <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrinho;