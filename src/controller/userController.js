import { FailedApi, SuccessApi } from "../helper/apiResponse.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { User, validateUser } from "../model/userModel.js";
dotenv.config();

const Secret_Key = process.env.SECRET_KEY;

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.USER_PASS
  }
});

// Create a new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Validate user input
    const { error } = validateUser(req.body);
    if (error) return FailedApi(res, 400, { message: "Validation error", error: error.details[0].message });

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) return FailedApi(res, 409, 'Email already registered');

    // Generate a random password and hash it
    const randomPassword = uuidv4().replace(/-/g, '').substring(0, 12);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Create a new user
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    });
    const userName = `${firstName} ${lastName}`;

    // Send a verification email
    await transporter.sendMail({
      from: 'usamatariq0320@gmail.com',
      to: newUser.email,
      subject: 'Check Your Credentials',
      html: `
        <!-- Email template HTML -->
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Our App</title>
            <!-- Inline CSS styles -->
            <style>
              body { /* Styles for the body element */
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
              }

              .container { /* Styles for the container div */
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                width: 600px;
                margin: 20px auto;
                padding: 30px;
              }

              h2 { /* Styles for the h2 element */
                color: #3498db;
                font-size: 28px;
                margin-bottom: 20px;
              }

              p { /* Styles for the p element */
                margin-bottom: 15px;
              }

              ul { /* Styles for the ul element */
                list-style: none;
                padding: 0;
                margin: 0;
              }

              li { /* Styles for the li element */
                margin-bottom: 10px;
              }

              .highlight { /* Styles for the highlight class */
                color: #3498db;
                font-weight: bold;
              }

              .footer { /* Styles for the footer class */
                margin-top: 30px;
                color: #888;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Welcome to Our App, <span class="highlight">${userName}</span>!</h2>
              <p>Your account has been successfully created. Here are your account details:</p>
              <ul>
                <li><strong>Name:</strong> <span class="highlight">${userName}</span></li>
                <li><strong>Email:</strong> <span class="highlight">${newUser.email}</span></li>
                <li><strong>Password:</strong> <span class="highlight">${randomPassword}</span></li>
              </ul>
              <p>You can use the provided password to log in to your account.</p>
              <p>If you did not request an account, please disregard this email.</p>
              <p>For any assistance, please contact our support team at <span class="highlight">usamatariq0320@gmail.com</span>.</p>
              <p>Best regards,</p>
              <p>The <span class="highlight">Samaritan Technologies Team</span></p>
              <div class="footer">This email is automatically generated. Please do not reply to this email.</div>
            </div>
          </body>
        </html>
      `,
    });

    // Send success response
    SuccessApi(res, 200, { message: 'User created successfully. Check your email for your Account Password.' });
  } catch (err) {
    // Handle errors
    return FailedApi(res, 400, { error: err.message });
  }
};

// User Signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the existing user by email
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) return FailedApi(res, 404, { message: "User Not Found" });

    // Compare password
    const comparePassword = await bcrypt.compare(password, existingUser.password);
    if (!comparePassword) return FailedApi(res, 400, { message: "Invalid Email or Password" });

    // Adjust payload for the token
    const payload = { email: existingUser.email, id: existingUser.userId };

    // Generate JWT token
    const token = jwt.sign(payload, Secret_Key, { expiresIn: '30d' });
    console.log("User Login Successfully");

    // Prepare response
    const result = { user: existingUser, token, message: "User Login Successfully" };
    SuccessApi(res, 200, result);
  } catch (error) {
    // Handle errors
    console.error("Signin error:", error);
    return FailedApi(res, 500, { message: "Internal Server Error" });
  }
};

export {
  createUser,
  signin
};
