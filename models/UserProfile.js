'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User_profile.init({
    user_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'User_profile',
    timestamps:true,

  });
  return User_profile;
};