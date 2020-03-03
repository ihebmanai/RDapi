var express = require('express');
var router = express.Router();
const sequelize = require('../connection')
const {DataTypes}=require('sequelize')
const User = require('../database/models/user')(sequelize, DataTypes)

/* GET users listing. */
router.post('/register',async function(req, res, next) {
 const userr =  User.create(req.body).then((data)=> res.json(userr)).catch((err)=>res.json(err))

});

module.exports = router;
