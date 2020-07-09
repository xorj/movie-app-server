import Sequelize, { Model } from "sequelize";
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        //Não colocar colunas preenchidas automaticamente
        title: Sequelize.STRING,
        text: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        movie_id: Sequelize.INTEGER,
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

export default User;
