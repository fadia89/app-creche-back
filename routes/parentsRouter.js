import { Router } from "express";
import { deleteParentByID, getAllParents, getParentProfile, updateProfile, createParent, getManyParent, updateParent} from "../controllers/parentsController.js";
import verifyParentFields from "../middlewares/verifyParentFields.js";
import verifyUser from "../middlewares/verifyUser.js";
import {upload} from '../middlewares/uploadFile.js'
import checkProfileEdit from "../middlewares/checkProfileEdit.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";




const parentsRouter = Router()



parentsRouter.get ('/parents', getAllParents);

//parentsRouter.get ('/parents/:id',getParentsByID);
parentsRouter.get('/profile',verifyUser,getParentProfile);

parentsRouter.post('/parents/many',verifyAdmin,getManyParent);

parentsRouter.post('/parents', verifyAdmin,createParent);

parentsRouter.patch('/parents/:id', verifyAdmin,updateParent);

parentsRouter.patch('/profile', verifyUser,upload.single('image'), checkProfileEdit,updateProfile);

parentsRouter.delete('/parents/:id', deleteParentByID);




export default parentsRouter;