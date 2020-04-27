const express = require("express");
const router = express.Router();
const sequelize = require("../connection");
const { DataTypes } = require("sequelize");
const Commentaire = require("../database/models/commentaire")(sequelize, DataTypes);
const Probleme = require("../database/models/probleme")(sequelize, DataTypes);
const Notifications = require("../database/models/notification")(sequelize, DataTypes);
const User = require("../database/models/user")(sequelize, DataTypes);


const jwt = require("jsonwebtoken");
const jwte = require("express-jwt");
const auth = jwte({
    secret: process.env.TOKEN_KEY,
    userProperty: "payload"
});


/* GET home page. */
router.post("/:id", auth, (req, res, next) => {
    try {
        Commentaire.create({ contenu: req.body.contenu, userId: req.payload.id, problemeId: req.params.id }).then((data) => {
            res.status(200).json(data);
            Probleme.findOne({ where: { id: req.params.id } }).then((probleme) => {
                if (probleme.supportId == req.payload.id) {
                    Notifications.create({
                        contenu: 'a commenté votre probléme',
                        type: 'comment',
                        state: 'unseen',
                        sender: req.payload.id,
                        reciver: probleme.userId,
                        problemeId: probleme.id
                    })
                } else {
                    Notifications.create({
                        contenu: 'a ajouté un commentaire à son probléme',
                        type: 'comment',
                        state: 'unseen',
                        sender: req.payload.id,
                        reciver: probleme.supportId,
                        problemeId: probleme.id
                    })
                }
            })

        });
    } catch (error) {
        console.log(error)
    }

});
router.get("/:id", (req, res, next) => {
    try {
        Commentaire.findAll({ where: { problemeId: req.params.id } }).then(
            (data) => {
                res.json(data)
            }
        );

    } catch (error) {
        console.log(error)
    }

});

module.exports = router;
