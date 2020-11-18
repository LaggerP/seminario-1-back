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

    await queryInterface.bulkInsert("Benefits", [
      {
        id: 1,
        local: "Tienda de deportes",
        description: "Llevate una malla de regalo",
        bonus: 100,
        type_shop: "Tienda",
        image_shop: "https://www.on24.com.ar/wp-content/uploads/2019/08/DP3H2aR.jpg",
        necessary_points: 80,
      },
      {
        id: 2,
        local: "Starbucks",
        description: "Llevate un café mediano",
        bonus: 100,
        type_shop: "Cafetería",
        image_shop: "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/11/25144100/Local-Starbucks-1920.jpg",
        necessary_points: 40,
      },
      {
        id: 3,
        local: "Starbucks",
        description: "Llevate un café grande",
        bonus: 100,
        type_shop: "Cafetería",
        image_shop: "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/11/25144100/Local-Starbucks-1920.jpg",
        necessary_points: 60,
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Benefits');
  }
};