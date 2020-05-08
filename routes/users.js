const express = require("express");
const passport = require("passport");
require("dotenv").config();
const router = express.Router();
const sequelize = require("../connection");
const { DataTypes } = require("sequelize");
const User = require("../database/models/user")(sequelize, DataTypes);
const jwt = require("jsonwebtoken");
const jwte = require("express-jwt");
//multer File uploader
const { upload } = require("../config/Uploader");

//dcrypt jwt token
const auth = jwte({
  secret: process.env.TOKEN_KEY,
  userProperty: "payload"
});

/* Register REST API  */
router.post("/register", async function (req, res, next) {
  const user = await User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: 'N1',
    email: req.body.email,
    image: "uploads/1584110542457favicon.jpg"
  });
  let token = jwt.sign(
    {
      id: user.dataValues.id,
      username: user.dataValues.username,
      name: user.dataValues.name,
      email: user.dataValues.email
    },
    process.env.TOKEN_KEY,
    { expiresIn: 1000 }
  );

  res.json(token);
});
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  //Find user by username

  try {
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
  } catch (error) {
    console.log(error)
  }

});
router.get("/profil", upload.single("userPhoto"), auth, (req, res) => {
  User.findOne({ where: { id: req.payload.id } }).then(user => {
    if (!user) {
      res.status(401).json("not found ");
    } else {
      res.status(200).json(user.dataValues);
    }
  });
});
router.put("/update", upload.single("userPhoto"), auth, (req, res) => {
  User.findOne({ where: { id: req.payload.id } }).then(user => {
    if (!user) {
      res.status(404).json("not found ");
    } else {
      let image = ((!req.file) ? "uploads/1584110542457favicon.jpg" : req.file.path);

      const { username, email, password, name } = req.body;
      user.update({ username, email, password, name, image: image }).then(user => {
        res.status(200).json(user.dataValues);
      });
    }
  });
});
router.post('/saveclient', async (req, res) => {
  User.findOne({ where: { name: req.body.name } }).then(async (data) => {
    let user;
    let token;
    if (data) {
      console.log(data.dataValues)
      token = jwt.sign(
        {
          id: data.dataValues.id,
          username: data.dataValues.username,
          name: data.dataValues.name,
          email: data.dataValues.email
        },
        process.env.TOKEN_KEY,
        { expiresIn: 1000 }
      );

    }
    else {
      user = await User.create({
        name: req.body.name,
        username: req.body.username,
        role: 'client',
        email: req.body.email,
        image: "uploads/1584110542457favicon.jpg"
      });
      token = jwt.sign(
        {
          id: user.dataValues.id,
          username: user.dataValues.username,
          name: user.dataValues.name,
          email: user.dataValues.email
        },
        process.env.TOKEN_KEY,
        { expiresIn: 1000 }
      );

    }
    res.json(token);
  });

});

router.get("/getAll", auth, (req, res) => {
  try {
    User.findAll({ raw: true }).then((users) => {
      res.status(200).json(users);

    });

  } catch (error) {

  }
});


module.exports = router;
