import { Router } from "express";
import { addChildren, getAllChildrens, getChildrenByID , updateChildren, deleteChildren,getManyChildren} from "../controllers/childrensController.js";
import verifyChildrenFields from "../middlewares/verifyChildrenFields.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";


const childrensRouter = Router();

childrensRouter.get('/childrens', verifyAdmin,getAllChildrens);

childrensRouter.get('/childrens/:id',verifyAdmin, getChildrenByID);

childrensRouter.post ('/childrens',verifyAdmin,verifyChildrenFields, addChildren);

childrensRouter.post ('/childrens/many',verifyAdmin, getManyChildren);

childrensRouter.delete ('/childrens/:id',verifyAdmin, deleteChildren);

childrensRouter.patch ('/childrens/:id',verifyAdmin, updateChildren);





export default childrensRouter;