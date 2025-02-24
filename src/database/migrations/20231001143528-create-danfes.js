'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('danfes', {
      customer_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'cnpj_or_cpf',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      invoice_number: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.ENUM('pending', 'assigned', 'returned', 'redelivery', 'cancelled', 'delivered', 'on_the_way'),
        allowNull: false,
      },
      barcode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      invoice_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      departure_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      total_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gross_weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      net_weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      total_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('danfes');
  },
};
