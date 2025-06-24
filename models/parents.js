import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase/db.js';


const Parent = sequelize.define('parent', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',  
      key: 'id'
    },
    onDelete: 'CASCADE'  // Si un utilisateur est supprimé, le parent sera aussi supprimé
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{
  tableName: 'Parents',
  timestamps: false
});


export default Parent;
