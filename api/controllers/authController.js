const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Verificar se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ 
                error: 'Este email já está cadastrado' 
            });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(senha, 12);
        
        // Criar o usuário
        const usuario = await Usuario.create({ 
            nome, 
            email, 
            senha: hashedPassword 
        });

        // Remover a senha da resposta
        const usuarioSemSenha = { ...usuario.toObject() };
        delete usuarioSemSenha.senha;

        res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso',
            usuario: usuarioSemSenha 
        });

    } catch (error) {
        console.error('Erro no cadastro:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validar campos obrigatórios
        if (!email || !senha) {
            return res.status(400).json({ 
                error: 'Email e senha são obrigatórios' 
            });
        }

        // Buscar usuário
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ 
                error: 'Email ou senha incorretos' 
            });
        }

        // Verificar senha
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ 
                error: 'Email ou senha incorretos' 
            });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        // Remover a senha da resposta
        const usuarioSemSenha = { ...usuario.toObject() };
        delete usuarioSemSenha.senha;

        res.json({ 
            message: 'Login realizado com sucesso',
            token,
            usuario: usuarioSemSenha
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
};

exports.verifyToken = async (req, res) => {
    try {
        // Se chegou até aqui, o token é válido (passou pelo middleware)
        res.json({ 
            valid: true, 
            userId: req.userId,
            email: req.userEmail
        });
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
};