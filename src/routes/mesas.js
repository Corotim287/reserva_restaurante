const express = require('express')
const router = express.Router()

const { authMiddleware, verificaAdmin } = require('../middlewares/authMiddleware')
const mesaController = require('../controllers/mesaController')

// Criar mesa (somente admin)
router.post('/', authMiddleware, verificaAdmin, mesaController.criaMesa)

// Listar mesas (qualquer usuário autenticado)
router.get('/', authMiddleware, mesaController.listaMesas)

// Atualizar mesa pelo número da mesa (somente admin)
router.patch('/:numero_mesa', authMiddleware, verificaAdmin, mesaController.atualizaMesa)

// Deletar mesa pelo número da mesa (somente admin)
router.delete('/:numero_mesa', authMiddleware, verificaAdmin, mesaController.deletaMesa)

module.exports = router
