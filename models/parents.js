import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase/db.js';
import User from './users.js';
import Children from './childrens.js';



const Parent = sequelize.define('parent', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',  // Table User à laquelle la clé fait référence
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
