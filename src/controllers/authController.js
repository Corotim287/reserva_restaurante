require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const segredo = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }
  try {
    const usuario = await Usuario.findOne({ where: { email, senha } });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      segredo,
    );
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno', detalhes: err.message });
  }
};

module.exports = { login };
