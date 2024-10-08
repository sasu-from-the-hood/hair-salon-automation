const jwt = require('jsonwebtoken');
const { db } = require('../static');
const User = require('../static').db;
require('dotenv').config();

/**
 * always  if the status is 403 then login requried so redirect them to /signin
 */

// admin authenticateJWTForAdmin

const authenticateJWTForAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: 'No user provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No user provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Token expired, check for refresh token
                const refreshToken = await db.fetchDataByValue("refreshToken", { userId: user.id });

                if (!refreshToken) {
                    return res.status(403).json({ message: 'login requried' });
                }

                try {
                    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                    const { id } = decoded;

                    // Fetch admin user from the database
                    const foundUser = await User.fetchDataByValue("admin", { userId: id });

                    if (!foundUser) {
                        return res.status(403).json({ message: 'Admin not found' });
                    }

                    return res.status(403).json({ message: 'login required' });

                } catch (err) {
                    return res.status(403).json({ message: 'Invalid or expired login status' });
                }
            } else {
                return res.status(403).json({ message: 'Invalid user' });
            }
        } else {

            const foundUser = await User.fetchDataByValue("admin", { userId: user.id });
            if (!foundUser) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            req.user = foundUser;
            next();
        }
    });
};


// Middleware to authenticate JWT clinits
const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err && err.name === 'TokenExpiredError') {
                // Token expired, check for refresh token
                const refreshToken = await db.fetchDataByValue("refreshToken", { userId: user.id, })

                if (!refreshToken) {
                    return res.status(403).json({ message: 'login required' });
                }

                try {
                    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                    const { id } = decoded;

                    // Fetch user from the database
                    const foundUser = await User.fetchDataByValue("user", { userId: id });

                    if (!foundUser) {
                        return res.status(403).json({ message: 'User not found' });
                    }

                    // Generate new tokens
                    const accessToken = createAccessToken(foundUser);
                    const newRefreshToken = createRefreshToken(foundUser);

                    // Save the new refresh token in the database
                    await db.upsertData('refreshToken', { userId: user.id, token: newRefreshToken })

                    // Send new tokens in headers
                    res.setHeader('Authorization', `Bearer ${accessToken}`);

                    // Attach user to request object
                    req.user = foundUser;

                    next();
                } catch (err) {
                    return res.status(403).json({ message: 'Invalid user login' });
                }
            } else if (err) {
                return res.status(403).json({ message: 'Invalid user' });
            } else {
                // Token valid, proceed
                req.user = user;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'login reqired' });
    }
};


const createAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // 1 hour expiration
    );
};


const createRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } // 7 days expiration
    );
};

const createTokens = async (user) => {
    const accessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);

    await db.upsertData('refreshToken', { userId: user.id, token: newRefreshToken })

    return { accessToken };
};

module.exports = { authenticateJWT, createTokens, authenticateJWTForAdmin };
