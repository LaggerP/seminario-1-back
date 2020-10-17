'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Benefits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      local: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      bonus: {
        type: Sequelize.FLOAT
      },
      type_shop: {
        type: Sequelize.STRING
      },
      image_shop: {
        type: Sequelize.STRING
      },
      necessary_points: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.CHAR
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Benefits');
  }
};