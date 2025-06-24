import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase/db.js';

const UserEvents = sequelize.define('userevent', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'UserEvents',
  timestamps: false
});

export default UserEvents;


