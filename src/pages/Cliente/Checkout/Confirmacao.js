import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartController from '../../../controllers/CartController';

function Confirmacao() {
  

  useEffect(() => {
    CartController.clearCart();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center p-4">
      <div className="display-1 mb-3">🎉</div>
      <h1 className="fw-bold text-success">Reserva Confirmada!</h1>
      <p className="lead text-muted" style={{ maxWidth: '500px' }}>
        Seus itens já estão separados. Por favor, apresente o número da matrícula no momento da retirada.
      </p>
      
      <div className="card p-3 mt-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <small className="text-muted text-uppercase">Status do Pedido</small>
        <h5 className="fw-bold mt-1">Aguardando Retirada</h5>
        <hr />
        <p className="mb-0 small">Enviamos um e-mail com os detalhes.</p>
      </div>

      <Link to="/" className="btn btn-primary mt-5 px-5">
        Voltar para a Vitrine
      </Link>
    </div>
  );
}

export default Confirmacao;