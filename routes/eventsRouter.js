import { Router } from "express";
import { addEvent, getAllEvents, getEventByID, updateEvent, deleteEventByID } from "../controllers/eventsController.js";
import verifyEventFields from "../middlewares/verifyEventFields.js";


const eventsRouter = Router();

eventsRouter.get('/events', getAllEvents );

eventsRouter.get('/event/:id', getEventByID );

eventsRouter.post('/event', addEvent );

eventsRouter.patch('/event/:id',updateEvent );

eventsRouter.delete('/event/:id',deleteEventByID);


export default eventsRouter;


