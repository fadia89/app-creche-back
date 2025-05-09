import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase/db.js';



const User = sequelize.define('user', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'parent'),
    defaultValue:'parent',
   
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true // facultatif
  }
}, {
  tableName: 'Users',  
  timestamps: false  // Pour les colonnes gérers automatiqument par Sequelize: createdAt et updatedAt
});


 





export default User;







