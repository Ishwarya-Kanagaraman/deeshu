'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      cart_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items');
     
  }
};
