const { User } = require('../database/models');

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username: 'Marcia',
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserByUsername
}