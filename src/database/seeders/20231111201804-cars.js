'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cars', [
      {
        model: 'Master Furgao',
        license_plate: 'GIF8B01',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Master Bau',
        license_plate: 'FRZ2A72',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Iveco',
        license_plate: 'EJY1A18',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Iveco',
        license_plate: 'EFO3J33',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Volks Delivery',
        license_plate: 'FVB3061',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Ford',
        license_plate: 'FRB1H14',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'HR',
        license_plate: 'EGK7611',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Ducato',
        license_plate: 'FVQ6A62',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Ducato',
        license_plate: 'FPL5J39',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Ducato',
        license_plate: 'FRM0G90',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Iveco',
        license_plate: 'AKG5F11',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Kira Bongo',
        license_plate: 'EWS5I24',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Fiorino',
        license_plate: 'FNS4J94',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'Mercedes Amiraldo',
        license_plate: 'FQH5D60',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cars', null, {});
  },
};
