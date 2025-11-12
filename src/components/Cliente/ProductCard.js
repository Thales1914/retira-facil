import React from 'react';
import Swal from 'sweetalert2';

function ProductCard({ product, onAdd }) {
  const { nome, categoria, imageUrl } = product;
  const formattedPrice = product.getFormattedPrice();

  // Função Estyle
  const handleAddClick = () => {
    onAdd(product);

    // Dispara o alerta bonito
    Swal.fire({
      title: 'Adicionado!',
      text: `${nome} foi para o carrinho.`,
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#fff',
      iconColor: '#2563eb'
    });
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 animate-fade-in">
      <div className="card h-100 product-card-modern">

        {/imagem com efeito rocheda/}
        <div className="product-image-wrapper">
          <img src={imageUrl} className="product-image-modern" alt={nome} />
        </div>

        <div className="card-body d-flex flex-column p-4">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="badge-category">{categoria}</span>
          </div>

          <h5 className="card-title fw-bold text-dark mb-1">{nome}</h5>

          <div className="mt-auto pt-3">
            <h4 className="fw-bold text-primary mb-3">{formattedPrice}</h4>

            <button
              className="btn btn-gradient w-100 rounded-pill shadow-sm"
              onClick={handleAddClick}
            >
              <i className="bi bi-bag-plus-fill me-2"></i> Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;