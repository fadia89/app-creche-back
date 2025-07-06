'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,      // Ajout autoIncrement pour clé primaire
      },
      first_name: {
        type: Sequelize.STRING,   // Remplacé DataTypes par Sequelize
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '/public/images/par_defaut.jpg',
      },
      role: {
        type: Sequelize.ENUM('admin', 'parent'),
        allowNull: false
      },
      createdAt: { 
        type: Sequelize.DATE, 
        allowNull: false 
      },
      updatedAt: { 
        type: Sequelize.DATE, 
        allowNull: false 
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
