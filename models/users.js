import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase/db.js';
import Parent from './parents.js';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
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
    allowNull: false
  }
}, {
  tableName: 'Users',  
  timestamps: false  // Pour les colonnes gérers automatiqument par Sequelize: createdAt et updatedAt
});



// Vérification du modèle pour s'assurer qu'il a été bien défini
console.log(User === sequelize.models.User); // Affiche true si tout est correct





export default User;







