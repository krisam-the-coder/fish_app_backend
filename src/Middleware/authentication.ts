import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv"
dotenv.config()


const SECRET_KEY = process.env.SECRET_KEY
if (!SECRET_KEY) {
    throw new Error('Missing secret key');
}


const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access token not provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Store the decoded token payload in the request object for further use
        req.user = decoded;
        next();
    });
};