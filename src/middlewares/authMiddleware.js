require('dotenv').config()
const jwt = require('jsonwebtoken')
const { Usuario } = require('../models')

// Recupera o segredo do token do arquivo .env
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_teste'

// Middleware de autenticação: verifica se o token é válido
const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }

  // Token vem no formato "Bearer <token>", pegamos a segunda parte
  const [, token] = authorizationHeader.split(' ')

  if (!token) {
    return res.status(401).json({ erro: 'Token mal formatado' })
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET)
    req.usuario = decodedToken // Armazena as informações decodificadas do token
    next()
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' })
  }
}

// Middleware de autorização: verifica se o usuário logado é admin
const verificaAdmin = async (req, res, next) => {
  try {
    const usuarioId = req.usuario?.id

    if (!usuarioId) {
      return res.status(403).json({ erro: 'Token inválido. ID de usuário ausente.' })
    }

    const usuario = await Usuario.findByPk(usuarioId)

    if (!usuario || usuario.role !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado. Usuário não é administrador.' })
    }

    // Atualiza o req.usuario com os dados completos do banco (opcional)
    req.usuario = usuario
    next()
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao verificar permissão', detalhes: err.message })
  }
}

module.exports = {
  authMiddleware,
  verificaAdmin
}
