const jwt = require("jsonwebtoken");
const pool = require("../../db.config");
const dotenv = require("dotenv");
const {
  getUserDetailByUsername,
  checkUserExist,
} = require("../handler/userHandler");
dotenv.config();

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const refreshToken = req.body?.refresh_token || req.query?.refresh_token;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token == null) return res.sendStatus(401);

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const isLogin = await pool.query(
      `SELECT refresh_token FROM credential WHERE username = '${user.username}' `
    );

    const isLoginValid = isLogin.rows[0].refresh_token === refreshToken;

    if (!isLoginValid) return res.sendStatus(401);

    req.user = user;

    next();

    return;
  } catch (error) {
    res.sendStatus(401);
    throw error;
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await getUserDetailByUsername(req.user.username);
    const { role } = user;

    const isAdmin = role === "admin" || role === "superadmin";
    req.user.role = role;

    if (!isAdmin) return res.status(401).json({ message: "you are not admin" });
    next();
  } catch (error) {
    res.sendStatus(400);
    throw error;
  }
};

const verifyUserExist = async (req, res, next) => {
  try {
    const { username } = req.body;
    const isUserExist = await checkUserExist(username);
    if (!isUserExist) {
      return res.sendStatus(404);
    }
    next();
  } catch (error) {
    throw error;
  }
};

module.exports = { verifyUser, verifyAdmin, verifyUserExist };
