const bcrypt = require("bcrypt");
const BCRYPT_ROUNDS = process.env.BCRYPT_ROUNDS || require('../config/config').BCRYPT_ROUNDS


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Roles',
          key: 'id'
        },
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

    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        username: "admin",
        password: bcrypt.hashSync("admin", BCRYPT_ROUNDS),
        email: "admin@tratalo.com",
        firstname: "admin Name",
        lastname: "admin LastName",
        role_id: 1,
      },
      {
        id: 2,
        username: "doctor",
        password: bcrypt.hashSync("doctor", BCRYPT_ROUNDS),
        email: "doctor@tratalo.com",
        firstname: "Doctor Name",
        lastname: "Doctor LastName",
        role_id: 2,
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};