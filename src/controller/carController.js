import { FailedApi, SuccessApi } from '../helper/apiResponse.js';
import { Car, validateCar } from '../model/carModel.js';
import Category from '../model/category.js';

// CRUD operations for Car

const createCar = async (req, res) => {
    try {
        const { error } = validateCar(req.body);

        if (error) {
            return FailedApi(res, 400, { message: 'Validation error', error: error.details[0].message });
        }

        const { color, model, make, registrationNo, categoryId } = req.body;

        // Check if required fields are missing
        if (!color || !model || !registrationNo || !categoryId) {
            return FailedApi(res, 400, { message: 'Missing required fields' });
        }

        // Check if the category exists
        const categoryExists = await Category.findByPk(categoryId);
        if (!categoryExists) {
            return FailedApi(res, 400, { message: 'Invalid category ID' });
        }

        // Check if a car with the same registration number already exists
        const existingCar = await Car.findOne({ where: { registrationNo } });
        if (existingCar) {
            return FailedApi(res, 400, { message: 'Car with the same registration number already exists' });
        }

        const car = await Car.create({ color, model, make, registrationNo, categoryId });
        SuccessApi(res, 200, { message: 'Your Car added successfully', carDetails: car });
    } catch (error) {
        return FailedApi(res, 400, { error: error.message });
    }
};

// Get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.findAll();
        SuccessApi(res, 200, { message: 'Here is Your Records of All Cars', carDetails: cars });
    } catch (error) {
        return FailedApi(res, 400, { error: error.message });
    }
};

// Update a car
const updateCar = async (req, res) => {
    const { id } = req.params;
    const { color, model, make, registrationNo, categoryId } = req.body;

    try {
        const car = await Car.findByPk(id);

        if (!car) {
            return FailedApi(res, 404, { error: 'Car not found' });
        }

        // Update car details
        car.color = color;
        car.model = model;
        car.make = make;
        car.registrationNo = registrationNo;
        car.categoryId = categoryId;

        await car.save();

        SuccessApi(res, 200, { message: 'Car updated successfully', carDetails: car });
    } catch (error) {
        return FailedApi(res, 400, { error: error.message });
    }
};

// Delete a car
const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findByPk(id);

        if (!car) {
            return FailedApi(res, 404, { error: 'Car not found' });
        }

        // Delete car
        await car.destroy();

        SuccessApi(res, 200, { message: 'Car deleted successfully' });
    } catch (error) {
        return FailedApi(res, 400, { error: error.message });
    }
};

export { createCar, getAllCars, updateCar, deleteCar };
