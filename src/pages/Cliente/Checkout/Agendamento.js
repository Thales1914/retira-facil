
import React, { useState } from 'react';

const mockSlots = [
  { day: 'Quinta-Feira, 6 de Novembro', slots: [
    { time: '09:00', capacity: 3, available: true }, 
    { time: '11:00', capacity: 2, available: true }, 
    { time: '14:00', capacity: 4, available: true }, 
    { time: '16:00', capacity: 5, available: true }, 
  ]},
  { day: 'Sexta-Feira, 7 de Novembro', slots: [
    { time: '09:00', capacity: 5, available: true }, 
    { time: '11:00', capacity: 4, available: true }, 
    { time: '14:00', capacity: 5, available: true }, 
    { time: '16:00', capacity: 3, available: true }, 
  ]}
];

function Agendamento() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelect = (day, time) => {
    setSelectedSlot({ day, time });
    console.log(`Horário selecionado: ${day} às ${time}`);
  };

  const handleContinue = () => {
    if (selectedSlot) {
        console.log("Continuar para Finalizar com agendamento:", selectedSlot);
    }
  };

  return (
    <div className="agendamento-page">
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
                <div 
                  key={slot.time}
                  className={`slot-card ${selectedSlot?.day === dayGroup.day && selectedSlot?.time === slot.time ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                  onClick={() => slot.available && handleSlotSelect(dayGroup.day, slot.time)}
                >
                  <p className="slot-time">{slot.time}</p>
                  <p className="slot-capacity">{slot.capacity} vagas</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      
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