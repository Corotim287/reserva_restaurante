const sequelize = require('../../config/database');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reserva', {
      // ID incremental para cada reserva
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // FK para usuários — reserva pertence a um usuário
      usuario_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      // FK para mesas — reserva vinculada a uma mesa
      mesa_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'mesa',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      // Data e hora da reserva, formato ISO
      data_reserva: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      // Status da reserva — ativo ou cancelado, padrão ativo
      status: {
        type: Sequelize.ENUM('ativo', 'cancelado'),
        allowNull: false,
        defaultValue: 'ativo',
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reserva');
    // Remover enum para evitar conflito em migrações futuras
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_reserva_status');
  }
};
