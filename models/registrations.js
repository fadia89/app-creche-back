import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase/db.js";

const Registration = sequelize.define('Registration', {

  registration_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: "pending",
    allowNull: false,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Parent',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  children_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Children',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'Registrations',
  timestamps: false,
});

export default Registration;
