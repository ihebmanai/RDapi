'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.ENUM(['client', 'N1'])

  }, {});
  User.associate = function (models) {
    // associations can be defined here
    models.Users.hasMany(models.Problemes, {
      foreignKey: 'userId',
      as: 'problemes'
    })
  };

  return User;
};