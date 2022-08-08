const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  "sa_forumDB",
  "postgres",
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  },
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
