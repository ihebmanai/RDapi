'use strict';
module.exports = (sequelize, DataTypes) => {
  const discussion = sequelize.define('discussion', {
    state: DataTypes.STRING,
    problemeId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    supportId: DataTypes.INTEGER,

  }, {});
  discussion.associate = function (models) {
    // associations can be defined here
    models.discussion.belongsTo(models.Problemes, {
      foreignKey: "problemeId",
    });
  };
  return discussion;
};