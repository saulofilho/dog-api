const { Sequelize, Model } = require('sequelize');

class Food extends Model {
  static init(sequelize) {
    super.init(
      {
        food: Sequelize.STRING,
        eat: Sequelize.STRING,
        infos: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Food;
