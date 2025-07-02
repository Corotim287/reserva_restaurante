const express = require('express')
const router = express.Router()

const { criaUsuario } = require('../controllers/usuarioController')
const { login } = require('../controllers/authController')

// Registrar novo usuário (rota pública)
router.post('/registro', criaUsuario)

// Login do usuário (rota pública)
router.post('/login', login)

module.exports = router
