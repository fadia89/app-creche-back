'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Activities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activity_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING, 
        allowNull: true,
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Events', 
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      children_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Childrens', 
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Activities');
  },
};
