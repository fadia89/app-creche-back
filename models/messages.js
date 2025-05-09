import { sequelize } from "../dataBase/db.js"; 
import { DataTypes } from "sequelize"; 


const Message = sequelize.define('message', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: 'Messages',
      timestamps: false, // ou true si tu veux Sequelize gère createdAt/updatedAt
    });
  
export default  Message;
 
  