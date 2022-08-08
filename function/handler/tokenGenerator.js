const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const pool = require("../../db.config");
const credential = require("../../models/credential.model");

const generateToken = async (data) => {
  try {
    const access_token = await jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20h",
    });
    const refresh_token = await jwt.sign(
      { refresh: true },
      process.env.REFRESH_TOKEN_SECRET
    );

    return { access_token, refresh_token };
  } catch (error) {
    throw error;
  }
};

const updateToken = async (refresh_token, username) => {
  try {
    const token = await credential.update(
      { refresh_token },
      {
        where: {
          username,
        },
      }
    );

    return token;
  } catch (error) {}
};

module.exports = { generateToken, updateToken };
