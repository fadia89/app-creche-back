import User from './users.js';
import Parent from './parents.js';
import Event from './events.js';
import Activity from './activities.js';
import Children from './childrens.js';
import { sequelize } from '../dataBase/db.js';



// 1. Relation entre User et Parent
User.hasOne(Parent, { foreignKey: 'user_id', as: 'parentDetails' });
Parent.belongsTo(User, { foreignKey: 'user_id' });

// 2. Relation entre Event et User
Event.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 3. Relation entre Event et Activity
Event.hasMany(Activity, { foreignKey: 'event_id', as: 'activities' });
Activity.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

// 4. Relation entre Activity et Children
Activity.belongsTo(Children, { foreignKey: 'children_id', as: 'child' });
Children.hasMany(Activity, { foreignKey: 'children_id', as: 'activities' });

// 5. Relation entre Parent et Children
Parent.hasMany(Children, { foreignKey: 'parent_id', as: 'children' }); // Un Parent a plusieurs enfants
Children.belongsTo(Parent, { foreignKey: 'parent_id', as: 'parent' }); // Un Enfant appartient à un Parent

// Synchronisation des modèles avec la base de données 
export default () => {
  /* sequelize.sync().then(() => {
    console.log('Database synchronized!');
  }).catch(err => {
    console.error('Error syncing database:', err);
  }); */
};
