import {Router} from 'express'
import { getAllUsers, getUserByID, deleteUserByID, updateUser, getUsersByRole, getManyUsers,addUser} from '../controllers/usersController.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import verifyUser from '../middlewares/verifyUser.js';


const usersRouter = Router();


usersRouter.get ('/users', verifyAdmin,getAllUsers);
  
usersRouter.get ('/users/:id', verifyAdmin,getUserByID);

usersRouter.get('/users/role/:role', verifyAdmin,getUsersByRole);

usersRouter.post('/users/many', verifyAdmin,getManyUsers);

usersRouter.post('/users', verifyAdmin,addUser);

usersRouter.delete('/users/:id', verifyAdmin,deleteUserByID);

usersRouter.patch('/users/:id', verifyUser,updateUser);


export default usersRouter;


