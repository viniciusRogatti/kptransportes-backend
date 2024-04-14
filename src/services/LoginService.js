const { User } = require('../database/models');

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username: 'username' });
    return user;
  } catch (error) {
    throw error;
  }
}