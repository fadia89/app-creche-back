import { sequelize } from "../dataBase/db.js";
import { DataTypes } from 'sequelize';





const Event = sequelize.define('event', {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    location: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    duration: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
      },
    quota: {
      type: DataTypes.INTEGER, 
      allowNull: true, 
    },
    user_id: { 
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        allowNull: false,
      },
    }, 
    {
      tableName: 'Events',
      timestamps: false
    });
  

   

   
    

 export default Event;


