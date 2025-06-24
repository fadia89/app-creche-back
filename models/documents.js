
import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase/db.js";

const Document = sequelize.define('document', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_added: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  uploaded_by: {
    type: DataTypes.STRING, // 'admin' ou 'parent'
    allowNull: false
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Documents',
  timestamps: false
});

export default Document;
