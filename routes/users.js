const express = require("express");
const passport = require("passport");
require("dotenv").config();
const router = express.Router();
const sequelize = require("../connection");
const { DataTypes } = require("sequelize");
const User = require("../database/models/user")(sequelize, DataTypes);
const jwt = require("jsonwebtoken");
const jwte = require("express-jwt");
//dcrypt jwt token
const auth = jwte({
  secret: process.env.TOKEN_KEY,
  userProperty: "payload"
});

/* Register REST API  */
router.post("/register", async function(req, res, next) {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    role:req.body.role,
    email:req.body.email
  });
  let token = jwt.sign(
    {
      id: user.dataValues.id,
      username: user.dataValues.username
    },
    process.env.TOKEN_KEY,
    { expiresIn: 1000 }
  );

  res.json(token);
});
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  //Find user by username
  let user = await User.findOne({ where: { username: username } });
  if (!user) {
    return res.status(404).json("user not found");
  }
  if (user.password == password) {
    const { id, username } = user.dataValues;
    //create payload to pass it to the  token
    const payload = { id, username };
    //Sign token
    jwt.sign(
      payload,
      process.env.TOKEN_KEY,
      { expiresIn: 10000 },
      (err, token) => {
        return res.status(200).json(token);
      }
    );
  } else {
    res.status(400).json("wrong password");
  }
});
router.get("/profil", auth, (req, res) => {
  User.findOne({ where: { id: req.payload.id } }).then(user => {
    if (!user) {
      res.status(401).json("not found ");
    } else {
      res.status(200).json(user.dataValues);
    }
  });
});

module.exports = router;
