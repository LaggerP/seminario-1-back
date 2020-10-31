'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_reading_profile extends Model {
    static associate(models) {
    }
  };
  Exercise_reading_profile.init({
    exercise_id: DataTypes.INTEGER,
    profile_id: DataTypes.BOOLEAN,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Exercise_reading_profile',
  });
  return Exercise_reading_profile;
};