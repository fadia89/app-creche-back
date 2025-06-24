import { Router } from "express";
import { addEvent, getAllEvents, getEventByID, updateEvent, deleteEventByID } from "../controllers/eventsController.js";
import verifyEventFields from "../middlewares/verifyEventFields.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";



const eventsRouter = Router();

eventsRouter.get('/events',getAllEvents );

eventsRouter.get('/events/:id', verifyAdmin,getEventByID );

eventsRouter.post('/events', verifyAdmin,verifyEventFields,addEvent );

eventsRouter.patch('/events/:id',verifyAdmin,updateEvent );

eventsRouter.delete('/events/:id',verifyAdmin,deleteEventByID);


export default eventsRouter;


