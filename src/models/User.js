const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Usuario extends Model {} // Cria a classe de modelo base

  Usuario.init(
    {
      // ID do usuário: UUID v4 gerado automaticamente
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      // Nome do usuário: string obrigatória com limite de 100 caracteres
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false
      },

      // E-mail do usuário: obrigatório, único e validado como e-mail
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true // garante que é um e-mail válido
        }
      },

      // Senha: campo obrigatório (hash da senha é armazenado aqui)
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      },

      // Role do usuário: define o tipo (ex: cliente ou admin), padrão: "cliente"
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'cliente'
      }
    },
    {
      sequelize, // instancia do Sequelize (conexão)
      modelName: 'Usuario', // nome interno do modelo
      tableName: 'usuarios', // nome da tabela no banco
      timestamps: false // desativa os campos createdAt e updatedAt
    }
  )

  return Usuario
}
