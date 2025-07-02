const sequelize = require('../../config/database')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mesa', {
      // UUID único para identificar cada mesa
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      // Número da mesa, único e obrigatório
      numero_mesa: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
      },

      // Capacidade máxima da mesa (número de pessoas)
      capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      // Status da mesa (disponível, reservada ou inativa)
      status: {
        type: Sequelize.ENUM('disponivel', 'reservada', 'inativa'),
        allowNull: false,
        defaultValue: 'disponivel'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    // Remove a tabela
    await queryInterface.dropTable('mesa')

    // Remove o tipo ENUM criado para status
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_mesa_status')
  }
}
