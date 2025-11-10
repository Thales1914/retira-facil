require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db.js');
const productRoutes = require('./src/routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API do Retira Fácil está funcionando, seu lerdo.' });
});

const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});