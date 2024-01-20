// models/car.js
import { DataTypes } from 'sequelize';
import Joi from 'joi';
import Category from './category.js'; 
import { sequelize } from '../config/database.js';

const Car = sequelize.define('Car', {
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
  },
  make: {
    type: DataTypes.STRING,
  },
  registrationNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});


// Joi schema for car validation
const carSchema = Joi.object({
    color: Joi.string().required(),
    model: Joi.string().required(),
    make: Joi.string().required(),
  registrationNo: Joi.string().required(),
  categoryId: Joi.number().integer().required(),
});

const validateCar = (car) => carSchema.validate(car);

Category.hasMany(Car, { foreignKey: 'categoryId' });
Car.belongsTo(Category, { foreignKey: 'categoryId' });

export { Car, validateCar };
