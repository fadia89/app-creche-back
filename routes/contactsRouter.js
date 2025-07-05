import { Router } from "express";
import { sendMessge, getMessges,deleteMessge } from "../controllers/contactsRouter.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";



const contactsRouter = Router();



contactsRouter.post ('/contacts', sendMessge);

contactsRouter.get ('/contacts', verifyAdmin,getMessges);

contactsRouter.delete ('/contacts/:id', verifyAdmin,deleteMessge);





export default contactsRouter;