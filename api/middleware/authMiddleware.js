const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET

module.exports =  (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) return res.status(403).send('Token não fornecido')

    try {
        const decoded = jwt.verify(token, SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).send('Token inválido')
    }
}