'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender: {
        type: Sequelize.INTEGER,
        references:{
          model: "Users",
          key : "id"
        }
      },
      receiver: {
        type: Sequelize.INTEGER,
        references:{
          model: "Users",
          key : "id"
        }
      },
      LanguageId: {
        type: Sequelize.INTEGER,
        references:{
          model: "Languages",
          key : "id"
        },
        onDelete: 'CASCADE'
      },
      text: {
        type: Sequelize.STRING
      },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};