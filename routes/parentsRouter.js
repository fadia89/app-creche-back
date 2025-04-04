import { Router } from "express";
import { addParent, deleteParentByID, getAllParents, getParentProfile, updateParentByID } from "../controllers/parentsController.js";
import verifyParentFields from "../middlewares/verifyParentFields.js";
import verifyParent from "../middlewares/verifyParent.js";


const parentsRouter = Router()

parentsRouter.get ('/parents', getAllParents);

//parentsRouter.get ('/parents/:id',getParentsByID);
parentsRouter.get('/profile',verifyParent,getParentProfile);

parentsRouter.post('/parents',verifyParentFields, addParent);

parentsRouter.patch('/parents/:id', updateParentByID);

parentsRouter.delete('/parents/:id', deleteParentByID);




export default parentsRouter;