import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/userModel.js';
dotenv.config();

const Secret_Key = process.env.SECRET_KEY;

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token Missing.' });
    }
    try {
        const decoded = jwt.verify(token, Secret_Key);
        const user = await User.findOne({ where: { email: decoded.email } });
        // console.log(user)

        if (!user) {
            return res.status(401).json({ message: 'Invalid or Missing token. User not found.' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

export default authenticateUser;
