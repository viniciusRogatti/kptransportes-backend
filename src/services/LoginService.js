require('dotenv').config();
const { User } = require('../database/models');
const jwt = require('jsonwebtoken');

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

const verifyToken = async (token) => {
  console.log('TOKEN===================>', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('DECODE ----------->',decoded);
  try {
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    throw new Error('Token inválido');
  }
};

module.exports = {
  getUserByUsername,
  verifyToken
}