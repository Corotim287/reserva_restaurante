const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Reserva extends Model {}

  Reserva.init(
    {
      // ID da reserva: inteiro autoincrementado (chave primária)
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      // ID do usuário que fez a reserva (chave estrangeira para a tabela "usuarios")
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios', // nome da tabela referenciada
          key: 'id'
        },
        onDelete: 'CASCADE', // se o usuário for deletado, as reservas dele também são
        onUpdate: 'CASCADE'  // se o id do usuário mudar (raro), atualiza aqui também
      },

      // ID da mesa reservada (chave estrangeira para a tabela "mesas")
      mesa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mesas',
          key: 'id'
        },
        onDelete: 'CASCADE', // se a mesa for removida, deleta a reserva
        onUpdate: 'CASCADE'
      },

      // Data e hora da reserva
      data_reserva: {
        type: DataTypes.DATE,
        allowNull: false
      },

      // Status da reserva: pode ser "ativo" ou "cancelado"
      status: {
        type: DataTypes.ENUM('ativo', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente' // ❗ Aqui está um erro (explicação abaixo)
      }
    },
    {
      sequelize,             // conexão com o banco de dados
      modelName: 'Reserva',  // nome do modelo Sequelize
      tableName: 'reserva',  // nome real da tabela no banco
      timestamps: false      // não cria createdAt e updatedAt
    }
  )

  return Reserva
}
