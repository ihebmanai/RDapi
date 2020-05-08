'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    sender: DataTypes.INTEGER,
    discussionId: DataTypes.INTEGER,
    receiver: DataTypes.INTEGER,
    contenu: DataTypes.STRING,
    files: DataTypes.STRING
  }, {});
  message.associate = function (models) {
    // associations can be defined here
    models.message.belongsTo(models.Users, {
      foreignKey: "clientId",
      as: "client"
    });
    models.message.belongsTo(models.Users, {
      foreignKey: "supportId",
      as: "support"
    });
    models.message.belongsTo(models.discussion, {
      foreignKey: "discussionId",
      as: "messages"
    });

  };
  return message;
};