'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exercise_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
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

    await queryInterface.bulkInsert("Exercise_types", [
      {
        id: 1,
        type:"Contador"
      },
      {
        id: 2,
        type:"Lectura"
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exercise_types');
  }
};