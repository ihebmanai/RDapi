'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categories', {
    name: DataTypes.STRING
  }, {});
  Categorie.associate = function (models) {
    // associations can be defined here

  };

  return Categorie;
};