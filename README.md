# API de Reserva de Restaurante

API RESTful desenvolvida em Node.js com Express e Sequelize para gerenciamento de mesas e reservas em um restaurante. Pensada para ser segura, escalável e organizada, com autenticação JWT e controle de acesso baseado em roles.

## Visão Geral do Projeto

Este projeto foi estruturado para facilitar o controle completo de reservas, mesas e usuários, contemplando:

🪑 Gerenciamento de Mesas
Cadastro, atualização, listagem e exclusão de mesas

📅 Gerenciamento de Reservas
Criação, listagem e cancelamento de reservas

🔐 Autenticação e Autorização
Controle via JSON Web Tokens (JWT)

👥 Controle de Acesso
Diferenciação entre usuários clientes e administradores

✅ Validação e Tratamento de Erros
Garantia de dados consistentes e respostas adequadas

A organização do código segue boas práticas, com separação clara entre models, controllers, middlewares e rotas, facilitando manutenção e futuras extensões.
```
📦 reserva-restaurante
├── 📁 src # Código-fonte principal da aplicação
│ ├── 📁 controllers # Controladores que tratam a lógica das rotas
│ │ ├── authController.js # Lida com autenticação de usuários (login)
│ │ ├── usuarioController.js # CRUD de usuários (listar, excluir, etc)
│ │ ├── mesaController.js # CRUD de mesas (admin)
│ │ └── reservaController.js # CRUD de reservas (usuário e admin)
│ │
│ ├── 📁 middlewares # Middlewares de autenticação e autorização
│ │ └── authMiddleware.js # Verifica token JWT e permissões (admin, dono)
│ │
│ ├── 📁 migrations # Scripts para criar e modificar tabelas no banco
│ │ ├── xxxx-create-usuarios.js
│ │ ├── xxxx-create-mesas.js
│ │ └── xxxx-create-reservas.js
│ │
│ ├── 📁 models # Modelos Sequelize (representam tabelas do banco)
│ │ ├── index.js # Conecta e exporta todos os modelos
│ │ ├── mesa.js # Modelo da tabela "mesas"
│ │ ├── reserva.js # Modelo da tabela "reservas"
│ │ └── usuario.js # Modelo da tabela "usuarios"
│ │
│ ├── 📁 routes # Define e organiza todas as rotas da aplicação
│ │ ├── index.js # Roteador principal que junta todas as rotas
│ │ ├── usuarios.js # Rotas protegidas para operações com usuários
│ │ ├── mesas.js # Rotas protegidas para CRUD de mesas
│ │ └── reservas.js # Rotas protegidas para CRUD de reservas
│ │
│ └── app.js # Arquivo principal da aplicação (Express)
│
├── .env # Variáveis de ambiente (portas, senhas, JWT_SECRET)
├── .gitignore # Arquivos e pastas que não devem ser enviados para o Git
├── package.json # Gerencia dependências e scripts do projeto
├── README.md # Documentação do projeto
```
## Tecnologias Utilizadas
```
🟢 Node.js — Plataforma JavaScript do lado do servidor
⚡ Express.js — Framework web minimalista e rápido
🛠️ Sequelize ORM — Mapeamento objeto-relacional para facilitar acesso ao banco
🐘 PostgreSQL — Banco de dados relacional poderoso e open source
🔐 JSON Web Tokens (JWT) — Autenticação e autorização baseada em tokens
🌿 dotenv — Gerenciamento de variáveis de ambiente para configuração segura
```
🖥️ Interface em Desenvolvimento
A aplicação foi desenvolvida inicialmente como uma API RESTful, mas em breve contará com uma interface visual (frontend) para facilitar o uso por clientes e administradores.
A ideia é tornar a experiência mais acessível, intuitiva e amigável, mantendo a mesma base robusta de autenticação e controle de permissões.


