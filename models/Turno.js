'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    static associate(models) {
      // define association here
    }
  };
  Turno.init({
    fecha: DataTypes.DATEONLY,
    hora: DataTypes.TIME,
    comentarios: DataTypes.STRING,
    status: DataTypes.CHAR,
    user_id: DataTypes.INTEGER,
    profile_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Turno',
    timestamps: true,
  });
  return Turno;
};