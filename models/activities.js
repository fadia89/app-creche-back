import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase/db.js";


const Activity = sequelize.define('activity', {
  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity_date: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  image : {
    type: String,
},
event_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Event', 
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
}, {
  tableName: 'Activities',  
  timestamps: false        
});

export default Activity;
