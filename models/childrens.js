import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase/db.js";
import Parent from "./parents.js";

const Children = sequelize.define('children', {
 
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Parent', 
      key: 'id'            
    },
    onDelete: 'CASCADE'    // If a parent is deleted, the child will also be deleted
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  registration_date: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  band: {
    type: DataTypes.ENUM('bébé', 'moyen', 'grand'),
    allowNull: false,
  },
  gender :{
    type: DataTypes.ENUM ('F', 'G'),
    allowNull: false,
  }

}, {
  tableName: 'Childrens',  
  timestamps: false        
});

export default Children;
