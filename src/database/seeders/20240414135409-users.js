'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Rogatti',
        password: bcrypt.hashSync('33873228', 10),
        permission: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Marcia',
        password: bcrypt.hashSync('kptransportes24', 10),
        permission: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Vika',
        password: bcrypt.hashSync('paredaoVL', 10),
        permission: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Karine',
        password: bcrypt.hashSync('karine@kp', 10),
        permission: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Jonathan',
        password: bcrypt.hashSync('isafuracao', 10),
        permission: 'user',
        driver_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};