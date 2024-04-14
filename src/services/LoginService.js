const { User } = require('../database/models');

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
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

module.exports = {
  getUserByUsername,
  verifyToken
}