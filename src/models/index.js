// Importa a conexão com o banco
const sequelize = require('../config/database')

// Importa os modelos passando a instância do Sequelize
const Usuario = require('./user')(sequelize)
const Reserva = require('./reserva')(sequelize)
const Mesa = require('./mesa')(sequelize)

// === Associações entre os modelos ===

// Um usuário pode ter várias reservas
Usuario.hasMany(Reserva, {
  foreignKey: 'usuario_id',
  as: 'reservas' // alias útil para incluir dados nas queries
})

// Cada reserva pertence a um usuário
Reserva.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
})

// Uma mesa pode ter várias reservas
Mesa.hasMany(Reserva, {
  foreignKey: 'mesa_id',
  as: 'reservas'
})

// Cada reserva pertence a uma mesa
Reserva.belongsTo(Mesa, {
  foreignKey: 'mesa_id',
  as: 'mesa'
})

// Exporta tudo junto
module.exports = {
  sequelize,
  Usuario,
  Mesa,
  Reserva
}
