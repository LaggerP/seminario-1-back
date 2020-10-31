'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rol: {
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

    await queryInterface.bulkInsert("Roles", [
      {
        id: 1,
        rol: "Admin",
      },
      {
        id: 2,
        rol: "Medico",
      },
      {
        id: 3,
        rol: "Responsable",
      },
      {
        id: 4,
        rol: "Paciente",
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  }
};