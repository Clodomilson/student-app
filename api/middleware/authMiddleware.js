const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Pegar o token do header Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

        if (!token) {
            return res.status(403).json({ 
                error: 'Token de acesso não fornecido' 
            });
        }

        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Adicionar informações do usuário ao request
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        
        next();
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: 'Token expirado' 
            });
        }
        
        return res.status(401).json({ 
            error: 'Token inválido' 
        });
    }
};