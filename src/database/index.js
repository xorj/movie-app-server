import Sequelize from "sequelize";
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
    this.connection = new Sequelize(
      process.env.DATABASE_NAME_DB_CONFIG,
      process.env.USER_NAME_DB_CONFIG,
      process.env.USER_PASSWORD_DB_CONFIG,
      {
        host: process.env.HOST_DB_CONFIG,
        dialect: process.env.DIALECT_DB_CONFIG,
        protocol: process.env.PROTOCOL_DB_CONFIG,
        logging: true,
        dialectOptions: {
          ssl: true,
        },
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      }
    );
    models.map((model) => {
      model.init(this.connection);
    });
  }
}

export default new Database();
