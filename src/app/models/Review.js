import Sequelize, { Model } from "sequelize";
class Review extends Model {
  static init(sequelize) {
    super.init(
      {
        //Não colocar colunas preenchidas automaticamente
        title: Sequelize.STRING,
        text: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        user_name: Sequelize.STRING,
        movie_id: Sequelize.INTEGER,
        rating: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

export default Review;
