'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.QuestionAndAnswer, {
        foreignKey: 'category_id',
      });

      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Category.init(
    {
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
