'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_reading extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Exercise_reading.init({
    exercise_type_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    timer: DataTypes.INTEGER,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Exercise_reading',
  });
  return Exercise_reading;
};