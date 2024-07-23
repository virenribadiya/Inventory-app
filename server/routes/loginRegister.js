import { Router } from 'express';
import { loginRegisterController } from '../controllers/loginRegister.js';

const loginRegisterRouter = Router();

loginRegisterRouter.post("/login", loginRegisterController.login);
loginRegisterRouter.post("/register", loginRegisterController.register);
loginRegisterRouter.post("/signInWithGoogle", loginRegisterController.signInWithGoogle);

export { loginRegisterRouter };