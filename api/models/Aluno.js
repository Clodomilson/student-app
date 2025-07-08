const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    nome: String,
    matricula: String,
    curso: String
})

module.exports = mongoose.model('Aluno', AlunoSchema)
