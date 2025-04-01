import express from 'express';
import { Router } from 'express';
//import getAdmin from '../controllers/adminController.js'


const adminRouter = Router();

// Route protégée par le middleware de rôle
//adminRouter.get('/admin', verifyRole(['admin']), getAdmin);

export default adminRouter;
