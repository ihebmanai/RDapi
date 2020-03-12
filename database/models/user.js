'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{  type:DataTypes.INTEGER,
      allowNull: false ,
      autoIncrement : true ,
      primaryKey : true ,},
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username:DataTypes.STRING,
    role:DataTypes.ENUM(['client','N1'])
  

  }, {});
 
  return User;
};