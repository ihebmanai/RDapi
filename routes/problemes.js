var express = require("express");
var router = express.Router();
const models = require('../database/models')
const sequelize = require("../connection");
const { DataTypes } = require("sequelize");
const Probleme = require("../database/models/probleme")(sequelize, DataTypes);
const Categorie = require("../database/models/categorie")(sequelize, DataTypes);
const Notifications = require("../database/models/notification")(sequelize, DataTypes);

const jwt = require("jsonwebtoken");
const jwte = require("express-jwt");
//multer File uploader
const { upload } = require("../config/Uploader");

/* dcrypt jwt token */
const auth = jwte({
  secret: process.env.TOKEN_KEY,
  userProperty: "payload"
});

/* Add a reclamation */

router.post("/", upload.single('files'), auth, (req, res, next) => {
  let files = [];
  let images = [];
  if (req.file.mimetype.split('/')[0] == "image") {
    images.push(req.file.path)
  } else {
    files.push(req.file.path)
  }
  Probleme.create({
    userId: req.payload.id,
    objet: req.body.objet,
    description: req.body.description,
    state: "envoyé",
    files: files,
    images: images,
    categorieId: req.body.categorie
  }).then((data) => {
    res.json(data)
    Notifications.create({
      contenu: 'a réclamé une probléme',
      type: 'recu',
      state: 'unseen',
      sender: req.payload.id,
      problemeId: probleme.id

    })

  });

});

/* get My reclamed probleme */
router.get("/", auth, (req, res, next) => {
  Probleme.findAll({
    where: { userId: req.payload.id },
    order: [['createdAt', 'DESC']]

  }).then(data => {
    res.json(data)
  });
});
router.get("/getById/:id", auth, (req, res, next) => {
  Probleme.findOne({
    where: { id: req.params.id }
  }).then(data => {
    res.json(data)
  });
});
router.get("/getAll", auth, (req, res, next) => {
  Probleme.findAll({ order: [['createdAt', 'DESC']] }).then(data => {
    res.json(data)
  });
});
router.get("/affect/:id", auth, (req, res, next) => {
  try {
    Probleme.findOne({ where: { id: req.params.id } }).then(async probleme => {
      if (!probleme.supportId)
        probleme.update({ supportId: req.payload.id, state: 'en cours' }).then(probleme => {
          Notifications.create({
            contenu: 'est affecté pour  résoudre votre  probléme',
            type: 'affecte',
            state: 'unseen',
            sender: req.payload.id,
            probleme: req.params.id,
            reciver: probleme.userId
          })
          res.status(200).json(probleme.get());
        });
      else {
        res.json({ probleme, affecte: 'affecte' });
      }
    }
    );
  } catch (error) {
    console.log(error)
  }

});
//Set probleme to Résolu
router.put("/resolu/:id", (req, res, next) => {

  Probleme.findOne({ where: { id: req.params.id } }).then(async probleme => {

    probleme.update({ state: 'résolu' }).then(probleme => {
      res.status(200).json(probleme.get());
      Notifications.create({
        contenu: 'la probleme est résolu ',
        type: 'resolu',
        state: 'unseen',
        problemeId: probleme.id,
        reciver: probleme.supportId
      })

    });
  }
  );
});

//set Probleme to Fermé
router.put("/fermer/:id", (req, res, next) => {

  Probleme.findOne({ where: { id: req.params.id } }).then(async probleme => {

    probleme.update({ state: 'fermé' }).then(probleme => {
      res.status(200).json(probleme.get());
      Notifications.create({
        contenu: 'Votre probleme est marquée comme Fermé ',
        type: 'comment',
        state: 'unseen',
        problemeId: probleme.id,
        reciver: probleme.userId,
        sender: probleme.supportId
      });

    });
  }
  );
});



module.exports = router;
