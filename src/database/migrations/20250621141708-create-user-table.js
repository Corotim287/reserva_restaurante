module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      // ID único com UUID gerado automaticamente
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      // Nome do usuário (obrigatório)
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      // E-mail do usuário (obrigatório e único)
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      // Senha (hash da senha, obrigatório)
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },

      // Papel do usuário: cliente ou admin
      role: {
        type: Sequelize.ENUM('cliente', 'admin'),
        allowNull: false,
        defaultValue: 'cliente'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    // Remove a tabela e também o ENUM do banco (boa prática)
    await queryInterface.dropTable('usuarios')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_usuarios_role')
  }
}
