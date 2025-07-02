const { Mesa, Reserva } = require('../models')

const criaReserva = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { numero_mesa, data_reserva, quantidade_pessoas } = req.body

    // localiza a mesa pelo numero
    const mesa = await Mesa.findOne({ where: { numero_mesa } });
    if (!mesa) {
      return res.status(400).json({ erro: 'Mesa não encontrada pelo número informado' })
    }

    // verifica se a mesa esta disponivel
    if (mesa.status === 'reservada') {
      return res.status(400).json({ erro: 'Mesa já está reservada' })
    }
    if (mesa.status === 'inativa') {
      return res.status(400).json({ erro: 'Mesa está inativa' })
    }
    if (mesa.status !== 'disponivel') {
      return res.status(400).json({ erro: `Mesa está com status inválido: ${mesa.status}` })
    }

    // Valida a quantidade de pessoas da mesa
    if (quantidade_pessoas > mesa.capacidade) {
      return res.status(400).json({ erro: `Quantidade de pessoas (${quantidade_pessoas}) maior que capacidade da mesa (${mesa.capacidade})` });
    }
    // Verifica se já existe reserva ativa para essa mesa e data/hora
    const conflito = await Reserva.findOne({
      where: {
        mesa_id: mesa.id,
        data_reserva,
        status: 'ativo',
      },
    })

    if (conflito) {
      return res.status(400).json({ erro: 'Mesa já reservada para essa data e hora' })
    }

    // Cria reserva com status "ativo"
    const reserva = await Reserva.create({
      usuario_id,
      mesa_id: mesa.id,
      data_reserva,
      status: 'ativo',
      quantidade_pessoas,
    })
    // Atualiza status da mesa para "reservada" ao finalizer
    await mesa.update({ status: 'reservada' })
    return res.status(201).json(reserva)
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar reserva', detalhes: err.message })
  }
}
const listaReservas = async (req,res) =>{
  try{
    const usuarioId = req.usuario.id
    const reservas = await Reserva.findAll({
      where:{
        status :'ativo',
        usuario_id:usuarioId
      }
    })
    return res.status(200).json(reservas)
  }catch(err){
    return res.status(500).json({ erro: 'Erro ao buscar reservas do usuário', detalhes: err.message })
  }  
}
const deletaReserva = async (req, res) => {
  try {
    const { id } = req.params // id da reserva que vai ser deletada

    const reserva = await Reserva.findByPk(id)
    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' })
    }

    //depois de deletar a reserva ,deixa a mesa antes indisponivel ,disponivel
    const mesa = await Mesa.findByPk(reserva.mesa_id)
    if (mesa) {
      mesa.status = 'disponivel'
      await mesa.save()
    }
    await reserva.destroy()
    return res.status(200).json({ mensagem: 'Reserva deletada com sucesso' })
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar reserva', detalhes: err.message })
  }
}

module.exports = {
  criaReserva,
  listaReservas,
  deletaReserva
}
