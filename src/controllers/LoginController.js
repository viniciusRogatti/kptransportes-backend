require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const LoginService = require('../services/LoginService');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await LoginService.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    const data = {
      permission: user.permission,
      driverId: user?.driver_id,
     }

    res.status(200).json({ token, data });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await LoginService.verifyToken(token);

    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(500).json({ valid: false, message: error.message });
  }
};

module.exports = {
  login,
  verifyToken,
};