import { Router } from "express";
import { sendMessge, getMessges } from "../controllers/contactsRouter.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";



const contactsRouter = Router();



contactsRouter.post ('/contacts', sendMessge);

contactsRouter.get ('/contacts', verifyAdmin,getMessges);






export default contactsRouter;