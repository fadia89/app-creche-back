import { Router } from "express";
import { sendMessge, getMessges } from "../controllers/contactsRouter.js";



const contactsRouter = Router();



contactsRouter.post ('/contacts', sendMessge);

contactsRouter.get ('/contacts', getMessges);






export default contactsRouter;