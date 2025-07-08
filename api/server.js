require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const { use } = require('react');

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado com sucesso'))
.catch((err) => console.error('Erro ao conectar:', err))



app.use('/auth', require('./routes/auth'))
app.use('/alunos', require('./routes/alunos'))

app.listen(3000, () => console.log('API rodando na porta 3000'))