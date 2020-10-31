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
      consigna: {
        type: Sequelize.STRING
      },
      image: {
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
        consigna: "Hola, mi nombre es ______ y mi apellido es ______.",
        description: "Lea y complete los espacios en blanco",
        image:'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      },
      {
        id: 2,
        exercise_type_id: 2,
        name: "Ejercicio Lectura N° 2",
        consigna: "Mi deporte favorito es ______ porque juego con mis amigos.",
        description: "Lea y complete los espacios en blanco",
        image:'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      },
      {
        id: 3,
        exercise_type_id: 2,
        name: "Ejercicio Lectura N° 3",
        consigna: "Los domingos me gusta ir la ______ a jugar con mi perro y mi hermano que se llama ______.",
        description: "Lea y complete los espacios en blanco",
        image:'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      },
      {
        id: 4,
        exercise_type_id: 2,
        name: "Ejercicio Lectura N° 4",
        consigna: "Mi comida favorita es ______ y la prepara mi ______ que le sale muy rico.",
        description: "Lea y complete los espacios en blanco",
        image:'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      },
      {
        id: 5,
        exercise_type_id: 2,
        name: "Ejercicio Lectura N° 5",
        consigna: "Me gusta jugar mucho al ______ con mi amigo ______, y luego vamos a su casa a tomar la merienda.",
        description: "Lea y complete los espacios en blanco",
        image:'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exercise_readings');
  }
};