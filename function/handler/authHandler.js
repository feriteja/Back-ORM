const db = require("../../db.config");
const bcrypt = require("bcrypt");

const UserModel = require("../../models/users.model");
const credential = require("../../models/credential.model");

const signUpUser = async (userName, password) => {
  try {
    const genSalt = await bcrypt.genSalt(10);

    const hashPass = await bcrypt.hash(password, genSalt);
    userName.replace(/'/g, "''");

    const orm1 = await credential.create({
      username: userName,
      password: hashPass,
    });

    const orm2 = await UserModel.create({ username: userName });

    const regisUser = await UserModel.findAll({
      where: {
        username: userName,
      },
    });

    return regisUser[0].dataValues;
  } catch (error) {
    throw error;
  }
};

const signInUser = async (username, password) => {
  try {
    username.replace(/'/g, "''");
    const userCred = await credential.findOne({ where: { username } });
    // const userCred = await pool.query(
    //   `SELECT * FROM credential WHERE username = '${username}'`
    // );

    if (!userCred) return false;
    const isUser = await bcrypt.compare(password, userCred.dataValues.password);

    if (!isUser) {
      return false;
    }

    const user = await UserModel.findOne({ where: { username } });

    return user.dataValues;
  } catch (error) {
    throw error;
  }
};

const signOutUser = async (username) => {
  try {
    username.replace(/'/g, "''");

    const res = await credential.update(
      { refresh_token: null },
      {
        where: { username },
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

const signForgot = async (username, password) => {
  try {
    const genSalt = await bcrypt.genSalt(10);

    const hashPass = await bcrypt.hash(password, genSalt);
    username.replace(/'/g, "''");

    const res = await credential.update(
      { password: hashPass },
      { where: { username } }
    );

    return res.dataValues;
  } catch (error) {}
};

module.exports = { signUpUser, signInUser, signOutUser, signForgot };
