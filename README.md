**NodeJs-Assignment:**

**Table of Contents:**
Introduction: #introduction
Technologies: #technologies
Setup: #setup
API Endpoints: #api-endpoints
Project Structure: #project-structure
Error Handling: #error-handling
Testing: #testing

**Introduction:**
Project Title (NodeJS-Assignment) is a Node.js application that provides CRUD APIs for managing categories and cars, along with robust user authentication. It's built with Express.js for server-side logic and Sequelize ORM for database interactions.

**Technologies:**
Node.js
Express.js
Sequelize ORM
JWT for authentication
Bcrypt for password hashing
Nodemailer for sending verification emails
Setup

**Clone the repository:**
git clone [https://github.com/usamat652/NodeJs-Assignment.git]

**Configure environment variables:**
Create a .env file in the project root.
Use the .env.example file as a template and fill in the required values.

**API Endpoints:**

**Categories:**
POST /category/create: Create a new category.
GET /category/readAll: Get all categories.
GET /category/read/:id: Get a specific category by ID.
PUT /category/update/:id: Update a category.
DELETE /category/delete/:id: Delete a category.

**Cars:**
POST /car/create: Create a new car.
GET /car/read: Get all cars.
PUT /car/update/:id: Update a car.
DELETE /car/delete/:id: Delete a car.

**Authentication:**
POST /user/create-user: Create a new user.
POST /user/login: User login.

**Project Structure:**
[NodeJs-Assignment]
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── helpers/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── index.js

**Error Handling:**
Errors are handled using a custom error response module (apiResponse.js).
Validation errors, duplicate entries, and other common scenarios are appropriately handled.

**Testing:**
Testing details are available in the tests directory.
Run tests using npm test.