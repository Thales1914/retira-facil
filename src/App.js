import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Vitrine from './pages/Cliente/Vitrine/Vitrine';
import Carrinho from './pages/Cliente/Carrinho/Carrinho';
import Agendamento from './pages/Cliente/Checkout/Agendamento';
import Finalizar from './pages/Cliente/Checkout/Finalizar';
import Confirmacao from './pages/Cliente/Checkout/Confirmacao'; // Precisamos criar esta tela!


import Login from './pages/Lojista/Login'; 
import GestaoProdutos from './pages/Lojista/Dashboard/GestaoProdutos'; 

function App() {
  return (
   
    <Router>
      <div className="App">
        <Routes>
         
          <Route path="/" element={<Vitrine />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/finalizar" element={<Finalizar />} />
          <Route path="/confirmacao" element={<Confirmacao />} />
          
         
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/produtos" element={<GestaoProdutos />} />

         
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;