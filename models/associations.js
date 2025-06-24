import User from '../models/users.js';
import Parent from '../models/parents.js';
import Children from '../models/childrens.js';
import Event from '../models/events.js';
import Activity from './activities.js';
import Document from './documents.js';
import Registration from './registrations.js';



// User <-> Parent
User.hasOne(Parent, { foreignKey: 'user_id', as: 'parentDetails' });
Parent.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Parent <-> Children
Parent.hasMany(Children, { foreignKey: 'parent_id' });
Children.belongsTo(Parent, { foreignKey: 'parent_id' });

// Children <-> Activity
Children.hasMany(Activity, { foreignKey: 'children_id' });
Activity.belongsTo(Children, { foreignKey: 'children_id' });

// Event <-> User
Event.belongsToMany(User, {through: 'UserEvents',foreignKey: 'event_id',timestamps: false });
User.belongsToMany(Event, {through: 'UserEvents',foreignKey: 'user_id',timestamps: false });


// Activity <-> Event
Activity.belongsTo(Event, { foreignKey: 'event_id' });
Event.hasMany(Activity, { foreignKey: 'event_id'});

// Document <-> Parent
Document.belongsTo(Parent, { foreignKey: 'parent_id' });

// Registration <-> User <-> Children
Registration.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Registration.belongsTo(Children, { foreignKey: 'children_id'});




export { User, Parent, Children, Event, Activity, Document, Registration};
