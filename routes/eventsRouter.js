import { Router } from "express";
import { addEvent, getAllEvents, getEventByID, updateEvent, deleteEventByID, getManyEvents } from "../controllers/eventsController.js";
import verifyEventFields from "../middlewares/verifyEventFields.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyUser from "../middlewares/verifyUser.js";



const eventsRouter = Router();

eventsRouter.get('/events',verifyUser,getAllEvents );

eventsRouter.get('/events/:id', verifyUser,getEventByID );

//This route is primarily used by react-admin to load data referenced in forms (such as SelectInputs bound to an event_id).
eventsRouter.post('/events/many', verifyAdmin,getManyEvents );

eventsRouter.post('/events', verifyAdmin,verifyEventFields,addEvent );

eventsRouter.patch('/events/:id',verifyAdmin,updateEvent );

eventsRouter.delete('/events/:id',verifyAdmin,deleteEventByID);


export default eventsRouter;


