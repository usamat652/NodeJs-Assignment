import express from 'express';
import { createCar, getAllCars, updateCar, deleteCar } from '../controller/carController.js';
import authenticateUser from '../middlewares/auth.js';

const carRouter = express.Router();

// Car routes
carRouter.post('/create', authenticateUser, createCar);
carRouter.get('/read', getAllCars);
carRouter.put('/update/:id', authenticateUser, updateCar);
carRouter.delete('/delete/:id', authenticateUser, deleteCar);

export default carRouter;
