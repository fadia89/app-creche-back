import { sequelize } from "../dataBase/db.js"; 
import { DataTypes } from "sequelize"; 


const Document = sequelize.define('document', {
      type: {
        type: DataTypes.STRING,
      },
      file_Name: {
        type: DataTypes.STRING,
      },
      date_Added: {
        type: DataTypes.DATE,
      },
      content: {
        type: DataTypes.TEXT,
      },
      parent_Id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    }, {
      tableName: 'Documents',
      timestamps: false, // si tu n’utilises pas createdAt/updatedAt
    });

    export default Document;
  
  