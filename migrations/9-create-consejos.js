'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Consejos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      status: {
        defaultValue: 1,
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
    await queryInterface.bulkInsert("Consejos", [
      {
        id: 1,
        title: "No gritar",
        content: "Es muy importante para tu correcta rehabilitación que no exijas la voz. Puede llegar a ocasionar daños irreversibles. ¡¡Cuídate!! ",
        status: 1,
      },
      {
        id: 2,
        title: "Evitar el uso de la voz en ambientes con mucho ruido",
        content: "En un ambiente con mucho ruido, para intentar hablar con los demás puede ser que intentes levantar demasiado el tono de voz. Trata de evitar estas situaciones, no son deseables para tu tratamiento. ",
        status: 1,
      },
      {
        id: 3,
        title: "No utilizar la voz a alta intensidad como modo de comunicación",
        content: "No es bueno para tu voz. Durante la recuperación, tu voz está muy delicada. Usá un tono de mediana intensidad para hablar.",
        status: 1,
      },
      {
        id: 4,
        title: "Evitar susurrar",
        content: "El susurro puede ser muy malo para tu voz en estos momentos. La exige demasiado. Recordá utilizar un tono de voz a media intensidad. ",
        status: 1,
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Consejos');
  }
};