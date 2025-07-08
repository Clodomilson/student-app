const mongoose = require('mongoose');


const UsuarioSchema = new mongoose.Schema({
    nome: String,
    email: {type: String, unique: true},
    senha: String
})

module.exports = mongoose.model('Usuario', UsuarioSchema)