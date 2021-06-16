'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proficiencies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proficiencies.belongsTo(models.User)
      Proficiencies.belongsTo(models.Languages)

    }
  };
  Proficiencies.init({
    UserId: DataTypes.INTEGER,
    LanguageId: DataTypes.INTEGER,
    proficiencyLvl: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Proficiencies',
  });
  return Proficiencies;
};