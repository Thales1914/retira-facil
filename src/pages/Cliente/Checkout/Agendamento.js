import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockSlots = [
  { day: 'Quinta-Feira, 14/11', slots: [
    { time: '09:00', available: true }, 
    { time: '10:00', available: false }, // Exemplo de horário lotado
    { time: '14:00', available: true }, 
    { time: '16:00', available: true }, 
  ]},
  { day: 'Sexta-Feira, 15/11', slots: [
    { time: '09:00', available: true }, 
    { time: '11:00', available: true }, 
    { time: '14:00', available: true }, 
  ]}
];

function Agendamento() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedSlot) {
      // AQUI É O PULO DO GATO:
      // Navegamos para a próxima tela levando o objeto 'selectedSlot' na bagagem (state)
      navigate('/finalizar', { state: { agendamento: selectedSlot } });
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="bg-white shadow-sm py-3 mb-4">
        <div className="container">
          <button onClick={() => navigate(-1)} className="btn btn-outline-secondary btn-sm border-0">
            ← Voltar
          </button>
          <h4 className="mt-2 fw-bold">Escolha o horário de retirada</h4>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '800px' }}>
        {mockSlots.map((dayGroup, index) => (
          <div key={index} className="card mb-4 border-0 shadow-sm">
            <div className="card-header bg-white fw-bold text-uppercase text-muted">
              📅 {dayGroup.day}
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2">
                {dayGroup.slots.map((slot) => {
                  const isSelected = selectedSlot?.day === dayGroup.day && selectedSlot?.time === slot.time;
                  
                  return (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot({ day: dayGroup.day, time: slot.time })}
                      className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-secondary'} 
                        ${!slot.available ? 'opacity-50' : ''} px-4 py-2`}
                    >
                      {slot.time}
                      {!slot.available && <small className="d-block" style={{fontSize: '0.6rem'}}>Esgotado</small>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Rodapé Fixo com Botão Continuar */}
        <div className="fixed-bottom bg-white p-3 shadow border-top">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Horário selecionado:</small>
                <div className="fw-bold text-primary">
                  {selectedSlot ? `${selectedSlot.day} às ${selectedSlot.time}` : 'Nenhum selecionado'}
                </div>
              </div>
              <button 
                className="btn btn-success btn-lg px-5" 
                disabled={!selectedSlot}
                onClick={handleContinue}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agendamento;