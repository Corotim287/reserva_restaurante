const { Usuario } = require('../models');

//Cria o usuario noveo no sistema
const criaUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body)
        return res.status(201).json(usuario)
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: err.message })
    }
}

//Deleta o usuario pelo seu id 
const deletaUsuario = async (req, res) => {
    try {
        const id = req.usuario.id;
        // busca o usuario por id 
        const usuario = await Usuario.findByPk(id)
        //valida se o usuario existe
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' })
        }
        await usuario.destroy();
        return res.status(200).json({ mensagem: 'Usuário deletado com sucesso' })
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao deletar usuário', detalhes: err.message })
    }
}
//atualiza o usuario pelo seu id 
const atualizaUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' })
        }
        await usuario.update(dadosAtualizados)
        return res.status(200).json(usuario)
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: err.message })
    }
}

module.exports = {
    criaUsuario,
    deletaUsuario,
    atualizaUsuario,
}
