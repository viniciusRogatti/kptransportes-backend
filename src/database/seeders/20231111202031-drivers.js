'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('drivers', [
      {
        name: 'Alessandro Reis',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Marcus Vinicius',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jonathan',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jonas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Diogo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Renato',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Eduardo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rodrigo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Sidney',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jesse',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jose Carlos',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Alessandro Veras',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
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
