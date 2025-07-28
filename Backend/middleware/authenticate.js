// middleware/authenticate.js
const jwt = require('jsonwebtoken');
// const User = require('../models/user'); // Optional: if you need to check if user still exists

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Auth Middleware: No Bearer token found in header');
        // Decide if you want to check cookies as a fallback here based on login strategy
        return res.status(401).json({ success: false, message: 'Authentication required: No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

    if (!token) {
        console.log('Auth Middleware: Token format incorrect');
        return res.status(401).json({ success: false, message: 'Authentication required: Token format incorrect.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to the request object for subsequent handlers
        req.userId = decoded.userId;
        console.log(`Auth Middleware: Token verified for userId: ${req.userId}`);

        // Optional: Check if user still exists in DB (uncomment if needed)
        // const user = await User.findById(req.userId);
        // if (!user) {
        //     console.log(`Auth Middleware: User ${req.userId} not found.`);
        //     return res.status(401).json({ success: false, message: 'Authentication failed: User not found.' });
        // }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authentication Error:', error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired.' });
        }
        return res.status(401).json({ success: false, message: 'Authentication failed.' });
    }
};

module.exports = authenticate;