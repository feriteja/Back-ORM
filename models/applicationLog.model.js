const { NOW } = require("sequelize");
const { DataTypes, UUIDV4 } = require("sequelize");
const db = require("../db.config");

const application_log = db.define(
  "application_log",
  {
    // Model attributes are defined here
    logID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    activity: {
      type: DataTypes.STRING(20),
    },
    status: {
      type: DataTypes.STRING(10),
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
    username: {
      type: DataTypes.STRING,
    },
    target: {
      type: DataTypes.TEXT,
    },
    detail: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = application_log;
