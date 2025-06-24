
import { Router } from "express";
import { addRegistration, getAllRegistations, getRegistationByID, updateRegistration } from "../controllers/registrationsController.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";



const registrationsRouter = Router();

registrationsRouter.get('/registrations', verifyAdmin,getAllRegistations );

registrationsRouter.get('/registrations/:id',verifyAdmin, getRegistationByID );

registrationsRouter.post('/registrations', verifyAdmin,addRegistration );

registrationsRouter.patch('/registrations/:id', verifyAdmin,updateRegistration );

export default registrationsRouter