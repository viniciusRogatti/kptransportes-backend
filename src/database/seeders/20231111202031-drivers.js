'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('drivers', [
      {
        id: 1,
        name: 'Alessandro Reis',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Marcus Vinicius',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Jonathan',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Jonas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'Diogo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: 'Renato',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Eduardo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Admilson',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Douglas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Jesse',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 11,
        name: 'Jose Carlos',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 12,
        name: 'Alessandro Veras',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 13,
        name: 'Amiraldo',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('drivers', null, {});
  },
};
