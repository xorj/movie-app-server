import Sequelize from "sequelize";
import databaseConfig from "../config/database";

//Importa Models
import User from "../app/models/User";
import Review from "../app/models/Review";

//Array com todos os models da aplicação
const models = [User, Review];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => {
      model.init(this.connection);
    });
  }
}

export default new Database();
