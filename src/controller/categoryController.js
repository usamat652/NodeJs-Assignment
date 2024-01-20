import { FailedApi, SuccessApi } from '../helper/apiResponse.js';
import Category from '../model/category.js';

// CRUD operations for Category

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Validate if required fields are provided
        if (!name) {
            return FailedApi(res, 400, { message: 'Name is required for creating a category' });
        }
        const category = await Category.create({ name });
        return SuccessApi(res, 200, { message: 'Category created successfully', categoryDetails: category });
    } catch (error) {
        return FailedApi(res, 400, { error: error.message });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return SuccessApi(res, 200, { categories });
    } catch (error) {
        return FailedApi(res, 400, { error: error.message });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return FailedApi(res, 404, { message: 'Category not found' });
        }

        return SuccessApi(res, 200, { category });
    } catch (error) {
        return FailedApi(res, 400, { error: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return FailedApi(res, 404, { message: 'Category not found' });
        }

        const { name, description } = req.body;

        // Validate if required fields are provided
        if (!name) {
            return FailedApi(res, 400, { message: 'Name is required for updating a category' });
        }

        await category.update({ name, description });

        return SuccessApi(res, 200, { message: 'Category updated successfully', categoryDetails: category });
    } catch (error) {
        return FailedApi(res, 400, { error: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return FailedApi(res, 404, { message: 'Category not found' });
        }

        // Delete category
        await category.destroy();

        return SuccessApi(res, 200, { message: 'Category deleted successfully' });
    } catch (error) {
        return FailedApi(res, 400, { error: error.message });
    }
};

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
