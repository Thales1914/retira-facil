import React from 'react';
import ReactDOM from 'react-dom/client';

// --- ESTAS SÃO AS IMPORTAÇÕES IMPORTANTES ---
import 'bootstrap/dist/css/bootstrap.min.css'; // O CSS do Layout
import 'bootstrap-icons/font/bootstrap-icons.css'; // <--- ADICIONE ESTA LINHA (Os Ícones)
// -------------------------------------------

import './index.css'; // O nosso CSS bonitão
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();