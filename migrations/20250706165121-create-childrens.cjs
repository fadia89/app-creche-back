'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Childrens', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Parents', 
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      registration_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      band: {
        type: Sequelize.ENUM('bébé', 'moyen', 'grand'),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('F', 'G'),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Childrens');
  },
};
