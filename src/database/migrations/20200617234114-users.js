"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reviews: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      watchlist: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      //Preenchidos automaticamente
      created_at: {
        type: Sequelize.DATE,
        allowNull: null,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: null,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
