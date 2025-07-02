const express = require('express')
const dotenv = require('dotenv')

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

const app = express()

// Importa as rotas do arquivo index.js na pasta routes
const routes = require('./routes')

// Middleware para permitir o Express interpretar JSON no corpo das requisições
app.use(express.json())

// Registra todas as rotas, usando a base '/' para o roteamento
app.use('/', routes)

// Rota raiz para testar se a API está rodando
app.get('/', (req, res) => {
  res.send('API rodando')
})

// Define a porta do servidor, primeiro verifica no .env, senão usa 3000
const PORT = process.env.PORT || 3000

// Inicializa o servidor e exibe no console a porta que está rodando
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
