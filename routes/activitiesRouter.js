import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.js";
import {upload} from '../middlewares/uploadFile.js'
import { addActivity, deleteActivitie, getActivitiesByID, getAllActivities, updateActivitie, getChildActivities } from "../controllers/activitiesController.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";




const activitiesRouter = Router();


//for the adminstaur see all activities
activitiesRouter.get ('/activities',verifyAdmin, getAllActivities);

activitiesRouter.get ('/activities/:id', verifyUser,getActivitiesByID);

// For users (parents): see only their child's activities
activitiesRouter.get('/my-activities', verifyUser, getChildActivities);

activitiesRouter.post ('/activities', verifyAdmin,upload.single('image'), addActivity);

activitiesRouter.patch('/activities/:id', verifyAdmin,upload.single('image'),updateActivitie);

activitiesRouter.delete('/activities/:id',verifyAdmin, deleteActivitie);

activitiesRouter.post('/activities', verifyAdmin,upload.single('image'),addActivity);




export default activitiesRouter;