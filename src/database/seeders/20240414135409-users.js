'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Marcia',
        password: bcrypt.hashSync('kptransportes24', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Rogatti',
        password: bcrypt.hashSync('33873228', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Vika',
        password: bcrypt.hashSync('paredaoVL', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Borges',
        password: bcrypt.hashSync('topera', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};