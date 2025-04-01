import {Router} from 'express'
import { getAllUsers, getUserByID, deleteUserByID, updateUserByID, getUsersByRole } from '../controllers/usersController.js';


const usersRouter = Router();

// Routes pour les utilisateurs 
usersRouter.get ('/users', getAllUsers);
  
usersRouter.get ('/users/:id', getUserByID);

usersRouter.get('/users/role/:role', getUsersByRole);

usersRouter.delete('/users/:id', deleteUserByID);

usersRouter.patch('/users/:id', updateUserByID);



export default usersRouter;


