import { sequelize } from "../dataBase/db.js"; 
import { DataTypes } from "sequelize"; 

const Registration = sequelize.define('registration', {
  registration_date: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    allowNull: true,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Parents', 
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users', 
      key: 'id'
    }
  },
  children_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Children',
      key: 'id'
    }
  }
}, {
  tableName: 'Registrations',
  timestamps: false,
});

export default Registration;
