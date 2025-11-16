// src/pages/Cliente/Checkout/Finalizar.js
import React, { useState } from 'react';

// Mock de dados de agendamento selecionado
const mockSelectedSlot = {
  day: 'Quinta-Feira, 6 de Novembro',
  time: '14:00'
};

// Mock de dados do carrinho para o resumo
const mockCartSummary = {
    total: 219.90,
    items: [
        { name: 'Mochila Escolar', quantity: 1, price: 129.90 },
        { name: 'Kit Cadernos', quantity: 2, price: 45.00 * 2 }
    ]
};

function Finalizar() {
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pedido Finalizado com Dados:", formData, "e Agendamento:", mockSelectedSlot);
    // Lógica futura: chamar OrderController para registrar o pedido no sistema do lojista (RF-4)
    // Redirecionar para a tela de Confirmação
    // history.push('/confirmacao');
  };

  return (
    <div className="finalizar-page">
      {/* Cabeçalho "Voltar" e Título */}
      <header className="page-header-simple">
        <button onClick={() => window.history.back()} className="back-button">← Voltar</button>
        <h1 className="page-title">Finalizar</h1>
      </header>

      <main className="finalizar-main-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          
          {/* Seção 1: Seus dados */}
          <div className="data-card">
            <h2 className="card-title">Seus dados</h2>
            <div className="form-group">
              <label htmlFor="nome">Nome do Aluno</label>
              <input type="text" id="nome" name="nome" placeholder="Nome completo do aluno" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="matricula">Matrícula</label>
              <input type="text" id="matricula" name="matricula" placeholder="Número de matrícula" value={formData.matricula} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail do Responsável</label>
              <input type="email" id="email" name="email" placeholder="responsavel@email.com" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
          
          {/* Seção 2: Retirada (Data e Horário) */}
          <div className="data-card">
            <h2 className="card-title">Retirada</h2>
            <div className="summary-info">
              <p className="summary-label">Data e horário</p>
              <p className="summary-value">{mockSelectedSlot.day} Às {mockSelectedSlot.time}</p>
            </div>
          </div>
          
          {/* Seção 3: Resumo do Pedido e Total */}
          <div className="data-card">
            <h2 className="card-title">Resumo do Pedido</h2>
            <ul className="order-list">
                {mockCartSummary.items.map((item, index) => (
                    <li key={index}>{item.quantity}x {item.name} - R$ {item.price.toFixed(2).replace('.', ',')}</li>
                ))}
            </ul>
            <div className="total-summary">
                <span className="total-label">Total a Pagar</span>
                <span className="total-amount">R$ {mockCartSummary.total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          
          {/* Botão de Conclusão */}
          <button type="submit" className="btn-finalizar-reserva">
            Confirmar Reserva (Pagamento na Retirada)
          </button>
        </form>
      </main>
    </div>
  );
}

export default Finalizar;