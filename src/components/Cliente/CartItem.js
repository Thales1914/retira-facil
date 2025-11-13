import React from 'react';
import Swal from 'sweetalert2'; 

function CartItem({ item, onUpdate, onRemove }) {
  const { product, quantity } = item; 
  
  const totalString = item.getFormattedTotalPrice ? item.getFormattedTotalPrice() : `R$ 0,00`;

  
  const handleRemoveClick = () => {
    Swal.fire({
      title: 'Remover item?',
      text: `Deseja tirar ${product.nome} do carrinho?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onRemove(product.id);
        Swal.fire('Removido!', 'O item foi retirado.', 'success');
      }
    });
  };

  return (
    <div className="card mb-3 border-0 shadow-sm animate-fade-in">
      <div className="row g-0 align-items-center p-2">
        
     
        <div className="col-3 col-md-2">
          <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '80px' }}>
             <img 
               src={product.imageUrl} 
               alt={product.nome} 
               className="img-fluid" 
               style={{ maxHeight: '60px' }} 
             />
          </div>
        </div>
        
        <div className="col-9 col-md-10 ps-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            
          
            <div className="mb-2 mb-md-0 flex-grow-1">
              <h6 className="mb-0 fw-bold text-dark">{product.nome}</h6>
              <small className="text-muted">{product.getFormattedPrice()} un.</small>
            </div>

           
            <div className="d-flex align-items-center justify-content-between gap-3">
              
            
              <div className="btn-group btn-group-sm shadow-sm" role="group">
                <button 
                  className="btn btn-outline-secondary fw-bold" 
                  onClick={() => onUpdate(product.id, -1)}
                  disabled={quantity <= 1}
                >-</button>
                <button className="btn btn-white border-top border-bottom disabled text-dark fw-bold px-3">
                  {quantity}
                </button>
                <button 
                  className="btn btn-outline-secondary fw-bold" 
                  onClick={() => onUpdate(product.id, 1)}
                >+</button>
              </div>

             
              <span className="fw-bold text-primary" style={{ minWidth: '80px', textAlign: 'right' }}>
                {totalString}
              </span>
              
          
              <button 
                className="btn btn-link text-danger p-0 ms-2" 
                onClick={handleRemoveClick}
                title="Remover item"
              >
                <i className="bi bi-trash-fill fs-5"></i>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;