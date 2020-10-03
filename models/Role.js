'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
    }
  };
  Role.init({
    rol: DataTypes.STRING,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Role',
    timestamps:true,

  });

  return Role;
};