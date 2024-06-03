'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionAndAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Variant, {
        foreignKey: 'question_id',
      });
      this.belongsTo(models.Category, {
        foreignKey: 'category_id',
      });
    }
  }

  QuestionAndAnswer.init(
    {
      category_id: DataTypes.INTEGER,
      question: DataTypes.TEXT,
      answer: DataTypes.TEXT,
      variants: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'QuestionAndAnswer',
    }
  );
  return QuestionAndAnswer;
};
