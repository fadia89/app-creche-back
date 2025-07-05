import { Router } from "express";
import { deleteParentByID, getAllParents, getParentProfile, updateProfile, createParent, getManyParent, updateParent,getParentsByID } from "../controllers/parentsController.js";
import verifyUser from "../middlewares/verifyUser.js";
import {upload} from '../middlewares/uploadFile.js'
import checkProfileEdit from "../middlewares/checkProfileEdit.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";




const parentsRouter = Router()



parentsRouter.get ('/parents',verifyAdmin, getAllParents);

parentsRouter.get('/parents/:id', verifyAdmin,getParentsByID);

parentsRouter.get('/profile',verifyUser,getParentProfile);


//This route is primarily used by react-admin to load data referenced in forms (such as SelectInputs bound to an parent_id).
parentsRouter.post('/parents/many',verifyAdmin,getManyParent);

parentsRouter.post('/parents', verifyAdmin,createParent);

parentsRouter.patch('/parents/:id', verifyAdmin,updateParent);

parentsRouter.patch('/profile', verifyUser,upload.single('image'), checkProfileEdit,updateProfile);

parentsRouter.delete('/parents/:id', verifyAdmin,deleteParentByID);




export default parentsRouter;