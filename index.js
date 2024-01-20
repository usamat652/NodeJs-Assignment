import express from 'express';
import userRouter from './src/routes/userRoute.js';
import { syncModels } from './src/config/database.js';
import dotenv from 'dotenv';
import categoryRouter from './src/routes/categoryRoutes.js';
import carRouter from './src/routes/carRoute.js';

dotenv.config();
syncModels();

const port = process.env.PORT;
const app = express();

// Body parsing middleware
app.use(express.json());

// Routes
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/car', carRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
