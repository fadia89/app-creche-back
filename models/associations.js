import Parent from '../models/parents.js';   
import Children from '../models/childrens.js';  
import User from '../models/users.js';  
import Parent from '../models/parents.js';      



// Parent -> User
Parent.belongsTo(User, { foreignKey: 'user_id' });

// Parent -> Children
Parent.hasMany(Children, { foreignKey: 'parent_id' });

// Children -> Parent
Children.belongsTo(Parent, { foreignKey: 'parent_id' });

// Event -> Parent
 Event.belongsTo(User, { foreignKey: 'user_id' });
