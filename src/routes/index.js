const express = require('express')
const router = express.Router()

// Importa as rotas de usuários, mesas e reservas
const usuarioRoutes = require('./usuarios')
const mesaRoutes = require('./mesas')
const reservaRoutes = require('./reservas')

// Define o caminho base para cada grupo de rotas
// Todas as rotas relacionadas a usuários começam com /usuarios
router.use('/usuarios', usuarioRoutes)

// Todas as rotas relacionadas a mesas começam com /mesas
router.use('/mesas', mesaRoutes)

// Todas as rotas relacionadas a reservas começam com /reservas
router.use('/reservas', reservaRoutes)

module.exports = router
