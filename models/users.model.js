const { NOW } = require("sequelize");
const { DataTypes, UUIDV4 } = require("sequelize");
const db = require("../db.config");
const forum = require("./forum.model");

const User = db.define(
  "users",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: "user",
    },
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    avatar: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
    },
    forumown: {
      type: DataTypes.STRING,
    },
    alias: {
      type: DataTypes.STRING(20),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
    state: {
      type: DataTypes.STRING(20),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
