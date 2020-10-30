'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consejo extends Model {
    static associate(models) {
      // define association here
    }
  };
  Consejo.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.CHAR,
  }, {
    sequelize,
    modelName: 'Consejos',
    timestamps: true,
  });
  return Consejo;
};