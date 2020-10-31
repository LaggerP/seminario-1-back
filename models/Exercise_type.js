'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_type extends Model {
    static associate(models) {
    }
  };
  Exercise_type.init({
    type: DataTypes.STRING,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Exercise_type',
  });
  return Exercise_type;
};