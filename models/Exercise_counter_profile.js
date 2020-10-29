'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_counter_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Exercise_counter_profile.init({
    exercise_id: DataTypes.INTEGER,
    profile_id: DataTypes.INTEGER,
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Exercise_counter_profile',
  });
  return Exercise_counter_profile;
};