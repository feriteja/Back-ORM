const express = require("express");
const pool = require("../../db.config");

const {
  signUpUser,
  signInUser,
  signOutUser,
  signForgot,
} = require("../../function/handler/authHandler");
const { generateToken } = require("../../function/handler/tokenGenerator");
const { checkUserExist } = require("../../function/handler/userHandler");
const { userLog } = require("../../function/middleware/userLog");
const { verifyUser } = require("../../function/middleware/verifyUser");

const router = express.Router();

//? SIGN UP
router.post(
  "/signUp",
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await signUpUser(username, password);

      const token = await generateToken(user);
      await pool.query(
        `UPDATE credential SET  refresh_token='${token.refresh_token}' WHERE username = '${username}'`
      );

      res.status(201).json({ message: "user has been registered", token });

      req.activity = "signup";
      req.status = "success";
      next();
    } catch (error) {
      req.activity = "signup";
      req.status = "success";
      res.status(409).json({ message: "user already exist" });
      next();
      throw error;
    }
  },
  userLog
);

//? REFRESH
router.get("/refresh", verifyUser, async (req, res) => {
  try {
    const {
      username,
      role,
      uuid,
      avatar,
      status,
      forumown,
      alias,
      created_at,
      state,
    } = req.user;
    const token = await generateToken({
      username,
      role,
      uuid,
      avatar,
      status,
      forumown,
      alias,
      created_at,
      state,
    });
    await pool.query(
      `UPDATE credential SET  refresh_token='${token.refresh_token}' WHERE username = '${username}'`
    );
    return res.status(200).json({ message: "success", token });
  } catch (error) {
    res.sendStatus(401);
    throw error;
  }
});

//? SIGN IN
router.post(
  "/signIn",
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await signInUser(username, password);
      if (!user) {
        req.activity = "signin";
        req.status = "failed";
        res.status(401).json({ message: "incorect email/password" });
        next();
        return;
      }

      const token = await generateToken(user);
      await pool.query(
        `UPDATE credential SET  refresh_token='${token.refresh_token}' WHERE username = '${username}'`
      );

      req.activity = "signin";
      req.status = "success";
      res.status(200).json({ message: "success", token });
      next();
    } catch (error) {
      req.activity = "signin";
      req.status = "failed";
      res.status(401).json({ message: "incorect email/password" });

      throw error;
    }
  },
  userLog
);

//? SIGN OUT
router.post(
  "/signOut",
  verifyUser,
  async (req, res, next) => {
    try {
      await signOutUser(req.user.username);
      res.sendStatus(204);
      req.activity = "signout";
      req.status = "success";
      next();
    } catch (error) {
      req.activity = "signup";
      req.status = "failed";
      res.status(403).json({ message: "something wrong" });
      next();
      throw error;
    }
  },
  userLog
);

//? FORGOT
router.patch("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const isChange = await signForgot(username, password);
    if (isChange === 0) {
      req.activity = "reset password";
      req.status = "failed";
      res.sendStatus(400);
      next();
      return;
    }

    req.activity = "reset password";
    req.status = "success";
    res.sendStatus(204);
    next();
    return;
  } catch (error) {
    req.activity = "reset password";
    req.status = "failed";
    res.sendStatus(400);
    next();
    throw error;
  }
});

//? CHECK USER EXIST
router.get("/check", async (req, res) => {
  try {
    const { username } = req.query;
    const isUser = await checkUserExist(username);
    if (!isUser) res.sendStatus(404);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
    throw error;
  }
});

module.exports = router;
