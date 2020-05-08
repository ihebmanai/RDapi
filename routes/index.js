var express = require('express');
var router = express.Router();
const sequelize = require("../connection");
const { DataTypes } = require("sequelize");
const discussion = require("../database/models/discussion")(sequelize, DataTypes);

/* GET home page. */
router.get('/', async function (req, res, next) {
  const dis = await discussion.create({
    state: "unseen",
    problemeId: 15,
    clientId: 2,
    supportId: 6,
  })
  res.json(dis)
});

module.exports = router;
