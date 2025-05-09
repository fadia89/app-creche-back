import {Router} from 'express'
import { getAllUsers, getUsersProfile,getUserByID, deleteUserByID, updateUser, getUsersByRole } from '../controllers/usersController.js';
import verifyUser from '../middlewares/verifyUser.js'
import { upload } from "../middlewares/uploadFile.js"

const usersRouter = Router();

// Routes pour les utilisateurs 
usersRouter.get ('/users', getAllUsers);
  
usersRouter.get ('/users/:id', getUserByID);

usersRouter.get('/profile',verifyUser,getUsersProfile);

usersRouter.get('/users/role/:role', getUsersByRole);

usersRouter.delete('/users/:id', deleteUserByID);

usersRouter.patch('/profile',verifyUser ,upload.single('image'),updateUser);



export default usersRouter;


