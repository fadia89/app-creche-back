import { Router } from "express";
import verifyUserFields from "../middlewares/verifyUserFields.js"
import { createUser, loginUser } from "../controllers/authController.js";
import { upload } from "../middlewares/uploadFile.js";




const authRouter = Router();

authRouter.post ('/register', upload.single('image'),verifyUserFields,createUser);

authRouter.post('/login',loginUser);


export default authRouter