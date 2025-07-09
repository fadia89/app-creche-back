import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../dataBase/db.js';

const User = sequelize.define('user', {

  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '/public/images/par_default.jpg',
  },
  role: {
    type: DataTypes.ENUM('admin', 'parent'),
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: false ,
  freezeTableName: true,

});


export default User;







