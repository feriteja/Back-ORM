const { DataTypes } = require("sequelize");
const db = require("../db.config");

const credential = db.define(
  "credential",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING(350),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = credential;
