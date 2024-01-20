import Joi from 'joi';
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});
const userJoiSchema = Joi.object({
    firstName: Joi.string().min(3).max(25).required().regex(/^[^\s]+$/),
    lastName: Joi.string().min(3).max(25).required().regex(/^[^\s]+$/),
    email: Joi.string()
        .email({ tlds: { allow: false } }) // Disallows top-level domains
        .pattern(/^[a-zA-Z0-9._%+-]+@(example\.com|gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|ds\.com)$/)
        .required(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*?[a-z]).{8,}$')),
});
const validateUser = (user) => userJoiSchema.validate(user);

export { User, validateUser };
