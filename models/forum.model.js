const { NOW } = require("sequelize");
const { DataTypes, UUIDV4 } = require("sequelize");
const db = require("../db.config");
const User = require("./users.model");

const forum = db.define(
  "forum",
  {
    // Model attributes are defined here
    fuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "forum asik",
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: NOW,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: "there is no content yet hehe :)",
      allowNull: false,
    },
    view_count: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    comment: {
      type: DataTypes.JSONB,
    },
    banner: {
      type: DataTypes.TEXT,
    },
    like_by: {
      type: DataTypes.ARRAY(DataTypes.UUIDV4),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = forum;
