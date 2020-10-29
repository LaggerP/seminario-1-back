'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('History_profile_exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User_profiles',
          key: 'id'
        },
      },
      exercise_reading_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercise_readings',
          key: 'id'
        },
      },
      exercise_counting_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercise_counters',
          key: 'id'
        },
      },
      last_entry: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('History_profile_exercises');
  }
};