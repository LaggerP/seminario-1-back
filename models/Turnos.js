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
    doctor_id: DataTypes.INTEGER,
    profile_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Turnos',
    timestamps: true,
  });
  return Turno;
};