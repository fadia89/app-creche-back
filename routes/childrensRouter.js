import { Router } from "express";
import Children from "../models/childrens.js";
import { addChildren, getAllChildrens, getChildrenByID , updateChildren, deleteChildren} from "../controllers/childrensController.js";
import verifyChildrenFields from "../middlewares/verifyChildrenFields.js";


const childrensRouter = Router();

childrensRouter.get('/childrens', getAllChildrens);

childrensRouter.get('/childrens/:id', getChildrenByID);

childrensRouter.post ('/childrens',verifyChildrenFields, addChildren);

childrensRouter.delete ('/childrens/:id', deleteChildren);

childrensRouter.patch ('/childrens/:id', updateChildren);





export default childrensRouter;