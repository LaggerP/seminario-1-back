'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History_profile_exercise extends Model {
    static associate(models) {
      // define association here
    }
  };
  History_profile_exercise.init({
    profile_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER,
    last_entry: DataTypes.DATE,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'History_profile_exercise',
  });
  return History_profile_exercise;
};