import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Category = sequelize.define('Category', {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'unique_category_name',
            msg: 'Category with this name already exists.',
        },
        validate: {
            notEmpty: {
                msg: 'Category name cannot be empty.',
            },
            len: {
                args: [1, 255],
                msg: 'Category name must be between 1 and 255 characters.',
            },
        },
    },
});


export default Category;