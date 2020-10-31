'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benefits extends Model {
    static associate(models) {
    }
  };
  Benefits.init({
    local: DataTypes.STRING,
    description: DataTypes.STRING,
    bonus: DataTypes.FLOAT,
    type_shop:DataTypes.STRING,
    image_shop: DataTypes.STRING,
    necessary_points: DataTypes.INTEGER,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Benefits',
  });
  return Benefits;
};