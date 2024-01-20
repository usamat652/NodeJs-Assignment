import express from 'express';
import { createUser, signin } from '../controller/userController.js';


const userRouter = express.Router();

//user routes
userRouter.post('/create-user', createUser)
userRouter.post('/login', signin)

export default userRouter