const express = require('express')
const router = express.Router()
const aluno = require('../controllers/alunoController')
const verifyToken = require('../middleware/authMiddleware')

router.use(verifyToken)
router.get('/', aluno.listar)
router.post('/', aluno.criar)
router.put('/:id', aluno.atualizar)
router.delete('/:id', aluno.deletar)

module.exports = router