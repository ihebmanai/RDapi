"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Problemes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      objet: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.ENUM(['envoyé', 'en cours', 'résolu', 'fermé'])
      },
      description: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        allowNull: false
      },
      supportId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        allowNull: true
      },
      categorieId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        },
        allowNull: false
      },
      files: { type: Sequelize.ARRAY(Sequelize.STRING) },
      images: { type: Sequelize.ARRAY(Sequelize.STRING) },

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
    return queryInterface.dropTable("Problemes");
  }
};
