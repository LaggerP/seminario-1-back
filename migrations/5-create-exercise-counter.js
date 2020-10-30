'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exercise_counters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exercise_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercise_types',
          key: 'id'
        },
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      timer: {
        type: Sequelize.INTEGER,
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
    await queryInterface.bulkInsert("Exercise_counters", [
      {
        id: 1,
        exercise_type_id: 1,
        name: "Decir durante 5 segundos",
        description: "Decir la letra 'A' durante 5 segundos",
        timer: 5000
      },
      {
        id: 2,
        exercise_type_id: 1,
        name: "Decir durante 6 segundos",
        description: "Decir la letra 'E' durante 6 segundos",
        timer: 6000
      },
      {
        id: 3,
        exercise_type_id: 1,
        name: "Decir durante 7 segundos",
        description: "Decir la letra 'I' durante 7 segundos",
        timer: 7000
      },
      {
        id: 4,
        exercise_type_id: 1,
        name: "Decir durante 8 segundos",
        description: "Decir la letra 'O' durante 8 segundos",
        timer: 8000
      },
      {
        id: 5,
        exercise_type_id: 1,
        name: "Decir durante 10 segundos",
        description: "Decir la letra 'U' durante 10 segundos",
        timer: 10000
      },
     
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exercise_counters');
  }
};