const { Mesa } = require('../models')

const criaMesa = async (req, res) => {
  try {
    const { numero_mesa, capacidade, status } = req.body
    // Verifica se os status para criação da mesa sao os esperados pelo banco
    const STATUS_VALIDOS = ['disponivel', 'reservada', 'inativa']
    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: 'Status da mesa inválido' })
    }
    //Caso passe pela validação cria a mesa ,caso de erro retorna 
    const mesa = await Mesa.create({ numero_mesa, capacidade, status })
    return res.status(201).json(mesa);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar mesa', detalhes: err.message })
  }
}

const atualizaMesa = async (req, res) => {
  try {
    //pega os dados do corpo ta minha requisição
    const { numero_mesa, status, capacidade } = req.body
    if (!numero_mesa) {
      return res.status(400).json({ erro: 'O número da mesa é obrigatório no corpo da requisição' })
    }
    //valida se os status sao validos de acordo com a estrutura do banco
    if (status) {
      const STATUS_VALIDOS = ['disponivel', 'reservada', 'inativa']
      if (!STATUS_VALIDOS.includes(status)) {
        return res.status(400).json({ erro: 'Status da mesa inválido' })
      }
    }
    //Se passar da primeira validação ,localiza a mesa pelo seu numero ,se retornar null retorna que nao encontrou a mesa
    const mesa = await Mesa.findOne({ where: { numero_mesa } })
    if (!mesa) {
      return res.status(404).json({ erro: 'Mesa não encontrada' })
    }
    // atualiza só os campos permitidos que vieram no corpo
    const camposParaAtualizar = {};
    if (status !== undefined) camposParaAtualizar.status = status
    if (capacidade !== undefined) camposParaAtualizar.capacidade = capacidade

    await mesa.update(camposParaAtualizar);
    return res.status(200).json(mesa);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao atualizar mesa', detalhes: err.message });
  }
}


const deletaMesa = async (req, res) => {
  try {
    //Pega o numero da mesa no corpo da requisição e busca a mesa pelo seu numero
    const  numero_mesa  = req.body;
    const mesa = await Mesa.findOne({where:{ numero_mesa } })
    //valida se a mesa existe se nao retorna erro
    if (!mesa) {
      return res.status(404).json({ erro: 'Mesa não encontrada'})
    }
    await mesa.destroy();
    return res.status(200).json({ mensagem: 'Mesa deletada com sucesso' })
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar mesa', detalhes: err.message })
  }
}

const listaMesas = async (req, res) => {
  try {
    //lista todas mesas do banco com findAll do squelize
    const mesas = await Mesa.findAll({
      attributes: ['numero_mesa', 'status']
    });
    return res.status(200).json(mesas);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar mesas', detalhes: err.message });
  }
}

module.exports = {
  criaMesa,
  atualizaMesa,
  deletaMesa,
  listaMesas
};
