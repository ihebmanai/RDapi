var express = require("express");
var router = express.Router();
const sequelize = require("../connection");
const { DataTypes } = require("sequelize");
const Message = require("../database/models/message")(sequelize, DataTypes);
const Discussion = require("../database/models/discussion")(sequelize, DataTypes);

const jwte = require("express-jwt");
const auth = jwte({
    secret: process.env.TOKEN_KEY,
    userProperty: "payload"
});


/* GET home page. */
router.post("/", auth, (req, res, next) => {
    Message.create(req.body).then((data) => {
        res.status(200).json(data)
    });
});
router.get("/getall", auth, (req, res, next) => {
    Discussion.findAll({ raw: true, order: [['updatedAt', 'DESC']] }).then(
        (data) => {
            res.json(data)
        }
    );
});
router.get("/msg/:id", auth, (req, res, next) => {
    Message.findAll({ where: { discussionId: req.params.id }, raw: true }).then(
        (data) => {
            res.json(data)
        }
    );
});
router.get("/chat/:id", auth, (req, res, next) => {
    try {
        Discussion.findOne({ where: { problemeId: req.params.id }, raw: true }).then(
            (data) => {
                res.json(data)
            }
        );
    } catch (error) {
        console.log(error)
    }

});
router.get("/support", auth, (req, res, next) => {
    Discussion.findAll({ where: { supportId: req.payload.id }, raw: true, order: [['updatedAt', 'DESC']] }).then(
        (data) => {
            res.json(data)
        }
    );
});
router.get("/client", auth, (req, res, next) => {
    Discussion.findAll({ where: { clientId: req.payload.id }, raw: true, order: [['updatedAt', 'DESC']] }).then(
        (data) => {
            res.json(data)
        }
    );
});
router.put("/seen/:id", (req, res, next) => {
    Discussion.findOne({ where: { id: req.params.id } }).then(async dis => {

        dis.update({ state: 'seen' }).then((dis) => {
            res.status(200).json("updated")
        }
        );

    });


});
router.put("/unseen/:id", (req, res, next) => {
    Discussion.findOne({ where: { id: req.params.id } }).then(async dis => {

        dis.update({ state: 'unseen' }).then((dis) => {
            Discussion.findAll({ raw: true, order: [['updatedAt', 'DESC']] }).then(
                (data) => {
                    res.json(data)
                }
            );
        });
    }
    );
});



module.exports = router;
