'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_profile extends Model {
    static associate(models) {
      // define association here
    }
  };
  User_profile.init({
    user_id: DataTypes.INTEGER,
    profile_name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    benefits_points: DataTypes.FLOAT,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'User_profile',

  });
  return User_profile;
};