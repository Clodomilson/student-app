require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado com sucesso'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/auth', require('./routes/auth'));
app.use('/alunos', require('./routes/alunos'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Student App funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));