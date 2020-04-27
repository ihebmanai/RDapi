'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    contenu: DataTypes.STRING,
    type: DataTypes.ENUM(['resolu', 'affecte', 'recu', 'comment']),
    sender: DataTypes.INTEGER,
    reciver: DataTypes.INTEGER,
    problemeId: DataTypes.INTEGER,
    state: DataTypes.ENUM(['seen', 'unseen'])

  }, {});
  Notification.associate = function (models) {
    // associations can be defined here
  };
  return Notification;
};