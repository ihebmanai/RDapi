require('dotenv').config();

config = {
  'development': {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  }

};
module.exports = config