var express = require("express");
var router = express.Router();
const sequelize = require("../connection");
const { DataTypes } = require("sequelize");
const Categorie = require("../database/models/categorie")(sequelize, DataTypes);

/* GET home page. */
router.post("/", (req, res, next) => {
    Categorie.create({ name: req.body.categorie }).then((data) => {
        res.status(200).json(data)
    });
});
router.get("/", (req, res, next) => {
    Categorie.findAll().then(
        (data) => {
            res.json(data)
        }
    );
});
router.delete("/:id", (req, res, next) => {
    Categorie.findOne({ where: { id: req.params.id } }).then(async user => {
        await user.destroy();
        res.json(200);
    }).catch((err) => {
        res.json(err)
    });
});

module.exports = router;
