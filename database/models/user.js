'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{  type:DataTypes.INTEGER(11),
      allowNull: false ,
      autoIncrement : true ,
      primaryKey : true ,},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username:DataTypes.STRING,
    role:DataTypes.ENUM(['recu','en cours','resolu'])

  }, {});
 
  return User;
};