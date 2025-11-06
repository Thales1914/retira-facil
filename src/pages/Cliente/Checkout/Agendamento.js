// src/pages/Cliente/Checkout/Agendamento.js
import React, { useState } from 'react';

// Dados mockados temporariamente para a visualização dos slots, conforme protótipo
const mockSlots = [
  { day: 'Quinta-Feira, 6 de Novembro', slots: [
    { time: '09:00', capacity: 3, available: true }, // 3 vagas
    { time: '11:00', capacity: 2, available: true }, // 2 vagas
    { time: '14:00', capacity: 4, available: true }, // 4 vagas
    { time: '16:00', capacity: 5, available: true }, // 5 vagas
  ]},
  { day: 'Sexta-Feira, 7 de Novembro', slots: [
    { time: '09:00', capacity: 5, available: true }, 
    { time: '11:00', capacity: 4, available: true }, 
    { time: '14:00', capacity: 5, available: true }, 
    { time: '16:00', capacity: 3, available: true }, 
  ]}
];

function Agendamento() {
  // Estado para armazenar o slot selecionado
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelect = (day, time) => {
    [cite_start]// Esta lógica simula a seleção, essencial para o RF-3 [cite: 63-64]
    setSelectedSlot({ day, time });
    console.log(`Horário selecionado: ${day} às ${time}`);
    // Futuro: Passar este slot para a próxima tela (Finalizar)
  };

  const handleContinue = () => {
    if (selectedSlot) {
        console.log("Continuar para Finalizar com agendamento:", selectedSlot);
        // Lógica futura: Redirecionar para a tela de Finalizar (Checkout)
    }
  };

  return (
    <div className="agendamento-page">
      {/* Cabeçalho "Voltar" e Título */}
      <header className="page-header-simple">
        <button onClick={() => window.history.back()} className="back-button">← Voltar</button>
        <h1 className="page-title">Escolha o horário</h1>
        <p className="page-subtitle">Selecione quando deseja retirar</p>
      </header>

      <main className="agendamento-main-content">
        {mockSlots.map(dayGroup => (
          <div key={dayGroup.day} className="day-group">
            <h2 className="day-title">{dayGroup.day}</h2>
            <div className="slots-grid">
              {dayGroup.slots.map(slot => (
                // O slot-card deve replicar o visual branco com bordas arredondadas
                <div 
                  key={slot.time}
                  className={`slot-card ${selectedSlot?.day === dayGroup.day && selectedSlot?.time === slot.time ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                  onClick={() => slot.available && handleSlotSelect(dayGroup.day, slot.time)}
                >
                  <p className="slot-time">{slot.time}</p>
                  {/* Exibição das vagas restantes, simulando o RNF-7 (limitar pedidos) */}
                  <p className="slot-capacity">{slot.capacity} vagas</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      
      {/* Botão de rodapé para avançar */}
      <footer className="agendamento-footer">
        {selectedSlot && (
          <button 
            className="btn-confirm-agendamento" 
            onClick={handleContinue}
          >
            Continuar para Finalizar
          </button>
        )}
      </footer>
    </div>
  );
}

export default Agendamento;