import express from 'express';
import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from '../controller/categoryController.js';
import authenticateUser from '../middlewares/auth.js';

const categoryRouter = express.Router();

// Category routes
categoryRouter.post('/create', authenticateUser, createCategory);
categoryRouter.get('/readAll', getAllCategories);
categoryRouter.get('/read/:id', getAllCategories);
categoryRouter.put('/update/:id', authenticateUser, updateCategory);
categoryRouter.delete('/delete/:id', authenticateUser, deleteCategory);

export default categoryRouter;
