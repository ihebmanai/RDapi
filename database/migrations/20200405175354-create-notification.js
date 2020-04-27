'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contenu: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM(['resolu', 'affecte', 'recu', 'comment'])
      },
      sender: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        allowNull: true
      },
      reciver: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        allowNull: true
      },

      problemeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Problemes",
          key: "id"
        },
        allowNull: true
      },
      state: Sequelize.ENUM(["seen", "unseen"]),
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notifications');
  }
};