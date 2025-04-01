import { Router } from "express";
import verifyUserFields from "../middlewares/verifyUserFields.js";
import { createUser, loginUser } from "../controllers/authController.js";




const authRouter = Router();

authRouter.post ('/register', verifyUserFields,createUser);

authRouter.post('/login',loginUser);


export default authRouter