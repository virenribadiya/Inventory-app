import { Router } from 'express';
import { userController } from '../controllers/user.js';
import { authentication } from '../utils/middleware/authentication.js';

const userRouter = Router();

userRouter.get("/getLoginUserDetails", authentication.common, userController.getLoginUserDetails);

export { userRouter };