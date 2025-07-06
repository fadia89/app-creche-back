import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase/db.js';


const Parent = sequelize.define('parent', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',  
      key: 'id'
    },
    onDelete: 'CASCADE' 
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
