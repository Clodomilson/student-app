exports.listar = async (req, res) => {
    const alunos = await Aluno.find()
    res.json(alunos)
}

exports.criar = async (req, res) => {
    const aluno = await Aluno.create(req.body)
    res.status(201).json(aluno)
}

exports.atualizar = async (req, res) => {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(aluno)
}

exports.deletar = async (req, res) => {
    await Aluno.findByIdAndDelete(req.params.id)
    res.status(204).send()
}