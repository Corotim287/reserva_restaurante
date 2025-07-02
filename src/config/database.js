const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // carrega as variáveis do .env

const sequelize = new Sequelize(
  process.env.DB_NAME,       // nome do banco
  process.env.DB_USER,       // usuário do banco
  process.env.DB_PASSWORD,   // senha do banco
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false 
  }
);

module.exports = sequelize;