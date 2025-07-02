const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Mesa extends Model {}

  // Define os campos da tabela "mesa"
  Mesa.init(
    {
      // ID da mesa: UUID gerado automaticamente
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      // Número da mesa: inteiro, único e obrigatório
      numero_mesa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },

      // Capacidade de pessoas da mesa: inteiro obrigatório
      capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      // Status da mesa: enum com três valores possíveis
      status: {
        type: DataTypes.ENUM('disponivel', 'reservada', 'inativa'),
        allowNull: false,
        defaultValue: 'disponivel' // padrão inicial é "disponivel"
      }
    },
    {
      sequelize, // instancia do Sequelize (conexão com o banco)
      modelName: 'Mesa', // nome do modelo
      tableName: 'mesa', // nome real da tabela no banco
      timestamps: false // desativa campos de data automática (createdAt, updatedAt)
    }
  )

  return Mesa
}
