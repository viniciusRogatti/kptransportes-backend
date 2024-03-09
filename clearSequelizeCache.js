const { Sequelize } = require('sequelize');

async function clearSequelizeCache() {
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '33873228',
    database: 'kp-transportes',
  });

  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Cache do Sequelize foi limpo com sucesso.');
  } catch (error) {
    console.error('Ocorreu um erro ao limpar o cache do Sequelize:', error);
  } finally {
    await sequelize.close();
  }
}

clearSequelizeCache();
