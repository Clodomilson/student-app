const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const brcypt = require('bcryptjs');

exports.register = async (req, res) => {
    const {nome, email, senha} = req.body;
    const hashedPassword = await brcypt.hash(senha, 10);
    const user = await Usuario.create({ nome, email, senha: hashed})
    res.status(201).json(user)
}

exports.login = async (req, res) => {
    const {email, senha} = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(404).send('Usuário não encontrado');

    const isMatch = await brcypt.compare(senha, user.senha);
    if (!isMatch) return res.status(401).send('Senha incorreta');

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
}