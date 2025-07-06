'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Documents', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_added: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      uploaded_by: {
        type: Sequelize.STRING,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Documents');
  },
};
