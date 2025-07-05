
import { Router } from 'express';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import { getAdmins, getAdminsMany } from '../controllers/adminsControlleurs.js';



const adminRouter = Router();

//Route for React Admin
adminRouter.get('/admins', verifyAdmin, getAdmins);

adminRouter.post('/admins/many', verifyAdmin, getAdminsMany);

export default adminRouter;