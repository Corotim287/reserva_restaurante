const express = require('express')
const router = express.Router()

const { authMiddleware } = require('../middlewares/authMiddleware')
const reservaController = require('../controllers/reservaController')

// Criar uma nova reserva (usuário autenticado)
router.post('/', authMiddleware, reservaController.criaReserva)

// Listar todas as reservas do usuário logado
router.get('/', authMiddleware, reservaController.listaReservas)

// Deletar reserva pelo ID (do usuário logado)
router.delete('/:id', authMiddleware, reservaController.deletaReserva)

module.exports = router
