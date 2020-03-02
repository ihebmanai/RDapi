const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('helpcenter', 'postgres', '98945544a', {
  host: 'localhost',
  dialect: 'postgres',
  port:12345
});
module.exports = sequelize ; 
global.module=sequelize ; 