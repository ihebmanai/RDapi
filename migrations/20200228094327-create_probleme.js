'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('probleme', {
    id: {
      type:Sequelize.INTEGER(11),
      allowNull: false ,
      autoIncrement : true ,
      primaryKey : true ,
  },
  content : Sequelize.STRING('500'),
  objet : Sequelize.STRING("100"),
  files: Sequelize.ARRAY(Sequelize.STRING),
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  state : Sequelize.ENUM(['recu','en cours','resolu'])


   })
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('probleme')
  }
};
