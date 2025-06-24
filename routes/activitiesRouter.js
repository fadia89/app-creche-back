import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.js";
import {upload} from '../middlewares/uploadFile.js'
import { addActivity, deleteActivitie, getActivitiesByID, getAllActivities, updateActivitie } from "../controllers/activitiesController.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";




const activitiesRouter = Router();



activitiesRouter.get ('/activities',verifyUser, getAllActivities);

activitiesRouter.get ('/activities/:id', verifyUser,getActivitiesByID);

activitiesRouter.post ('/activities', verifyAdmin,upload.single('image'), addActivity);

activitiesRouter.patch('/activities/:id', verifyUser,upload.single('image'),updateActivitie);

activitiesRouter.delete('/activities/:id',verifyAdmin, deleteActivitie);

activitiesRouter.post('/activities', verifyAdmin,upload.single('image'),addActivity);




export default activitiesRouter;