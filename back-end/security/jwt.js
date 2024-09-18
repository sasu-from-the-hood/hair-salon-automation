const jwt = require('jsonwebtoken');

// Create JWT token upon successful login
const createToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );
};

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extract token from Bearer token

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            req.user = user; // Attach decoded user data to the request
            next(); // Proceed to next middleware or route handler
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

module.exports = { createToken, authenticateJWT };
