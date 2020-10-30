'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exercise_readings', {
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
    await queryInterface.bulkInsert("Exercise_readings", [
      {
        id: 1,
        exercise_type_id: 2,
        name: "Ejercicio Lectura N° 1",
        description: "Hola, mi nombre es ______ y mi apellido es ______.",
      },
      {
        id: 2,
        exercise_type_id: 2,
        name: "Ejercicio Lectura N° 2",
        description: "Mi deporte favorito es ______ porque juego con mis amigos.",
      },
      {
        id: 3,
        exercise_type_id: 2,
        name: "Ejercicio Lectura N° 3",
        description: "Los domingos me gusta ir la ______ a jugar con mi perro y mi hermano que se llama ______.",
      },
      {
        id: 4,
        exercise_type_id: 2,
        name: "Ejercicio Lectura N° 4",
        description: "Mi comida favorita es ______ y la prepara mi ______ que le sale muy rico.",
      },
      {
        id: 5,
        exercise_type_id: 2,
        name: "Ejercicio Lectura N° 5",
        description: "Me gusta jugar mucho al ______ con mi amigo ______, y luego vamos a su casa a tomar la merienda.",
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exercise_readings');
  }
};