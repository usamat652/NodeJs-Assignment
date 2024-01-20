import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  'task',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
)
async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Models synchronized with the database.');
  } catch (error) {
    console.error('Error syncing models with the database:', error);
  }
}

export { sequelize, syncModels }