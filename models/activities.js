import { sequelize } from "../dataBase/db.js"; 
import { DataTypes } from "sequelize"; 

const Activity = sequelize.define('activity', {

  name: {
    type: DataTypes.STRING,  
    allowNull: true,  
  },
  description: {
    type: DataTypes.STRING,  
    allowNull: true,  
  },
  activity_date: {
    type: DataTypes.DATE,  
    allowNull: true,  
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,  
    references: {
      model: 'Event',  
      key: 'id',  
    },
    onDelete: 'CASCADE',  // Si l'événement est supprimé, supprimez les activités associées
  },
  children_id: {
    type: DataTypes.INTEGER,
    allowNull: false,  
    references: {
      model: 'Children',  
      key: 'id',  
    },
    onDelete: 'CASCADE',  // Si l'enfant est supprimé, supprimez les activités associées
  },
}, {
  tableName: 'Activities',  
  timestamps: false,  // Pas de colonnes 'createdAt' et 'updatedAt'
});

export default Activity;
