const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize("sa_forumDB", "postgres", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
