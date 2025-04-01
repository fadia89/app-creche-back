import { Router } from "express";
import { addEvent, getAllEvents, getEventByID, updateEvent, deleteEventByID } from "../controllers/eventsController.js";
import verifyEventFields from "../middlewares/verifyEventFields.js";


const eventsRouter = Router();

eventsRouter.get('/events', getAllEvents );

eventsRouter.get('/events/:id', getEventByID );

eventsRouter.post('/events', verifyEventFields,addEvent );

eventsRouter.patch('/events/:id',updateEvent );

eventsRouter.delete('/events/:id',deleteEventByID );


export default eventsRouter;


