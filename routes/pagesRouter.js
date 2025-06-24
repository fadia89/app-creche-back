import { Router } from "express";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import { getAllPages,getPageBySlug, updatePage } from "../controllers/pagesControlleur.js";


const pagesRouter = Router();


pagesRouter.get('/', verifyAdmin, getAllPages);

pagesRouter.get('/:slug', verifyAdmin, getPageBySlug);


pagesRouter.patch('/:id',verifyAdmin,updatePage);


 export default pagesRouter;