import { Router } from "express";
import { addChildren, getAllChildrens, getChildrenByID , updateChildren, deleteChildren} from "../controllers/childrensController.js";
import verifyChildrenFields from "../middlewares/verifyChildrenFields.js";


const childrensRouter = Router();

childrensRouter.get('/childrens', getAllChildrens);

childrensRouter.get('/children/:id', getChildrenByID);

childrensRouter.post ('/children',verifyChildrenFields, addChildren);

childrensRouter.delete ('/children/:id', deleteChildren);

childrensRouter.patch ('/children/:id', updateChildren);





export default childrensRouter;