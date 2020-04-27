var express = require("express");
var router = express.Router();
const sequelize = require("../connection");

const { DataTypes, Op } = require("sequelize");
const Notifications = require("../database/models/notification")(sequelize, DataTypes);
const jwte = require("express-jwt");
//multer File uploader

//dcrypt jwt token
const auth = jwte({
    secret: process.env.TOKEN_KEY,
    userProperty: "payload"
});

/* GET home page. */
router.get("/", auth, (req, res, next) => {
    console.log(req.payload.id)
    Notifications.findAll({
        where: {
            [Op.or]: [
                { reciver: req.payload.id },
                { reciver: null }
            ],
            [Op.and]: [
                { state: 'unseen' },
            ]
        },
        order: [['createdAt', 'DESC']]

    }).then((notifs) => {
        res.json(notifs);
    })
});
router.put("/:id", (req, res, next) => {
    Notifications.findOne({ where: { id: req.params.id } }).then(async notif => {

        notif.update({ state: 'seen' }).then((notif) => {
            res.status(200).json(notif.get());


        });
    }
    );
});

module.exports = router;
