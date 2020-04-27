"use strict";
module.exports = (sequelize, DataTypes) => {
  const Probleme = sequelize.define(
    "Problemes",
    {
      objet: DataTypes.STRING,
      description: DataTypes.STRING(5000),
      state: DataTypes.ENUM(['envoyé', 'en cours', 'résolu', 'fermé']),
      supportId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      categorieId: DataTypes.INTEGER,
      files: DataTypes.ARRAY(DataTypes.STRING),
      images: DataTypes.ARRAY(DataTypes.STRING)
    },
    {}
  );
  Probleme.associate = function (models) {
    // associations can be defined here
    models.Problemes.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "client"
    });


  };
  return Probleme;
};
