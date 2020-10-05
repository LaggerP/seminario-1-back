'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Exercise.init({
    exercise_type: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};