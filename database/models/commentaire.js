'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define('Commentaires', {
    contenu: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    problemeId: DataTypes.INTEGER
  }, {});
  Commentaire.associate = function (models) {
    // associations can be defined here
  };
  return Commentaire;
};