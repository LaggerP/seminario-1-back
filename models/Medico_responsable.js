'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medico_responsable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Medico_responsable.init({
    medico_id: DataTypes.INTEGER,
    responsable_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medico_responsable',
  });
  return Medico_responsable;
};