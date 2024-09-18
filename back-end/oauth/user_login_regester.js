
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid'); // To generate unique user IDs
const bcrypt = require('bcrypt'); // For password hashing
const { createToken } = require('../security/jwt');
const static = require('../static');

const loginRoute = express.Router();
const registerRoute = express.Router();
const oauthRoute = express.Router();
// const logoutRoute = express.Router();

// Middleware for parsing JSON bodies
loginRoute.use(express.json());
registerRoute.use(express.json());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const { id, displayName, emails, photos, phone_number } = profile;
            const email = emails && emails.length > 0 ? emails[0].value : null;
            const photo = photos && photos.length > 0 ? photos[0].value : null;

            // Check if the user already exists in the database
            const result = await static.db.fetchDataByValue('users', 'google_id', id, '*');
            const existingUser = result.data.length > 0 ? result.data[0] : null;

            if (!existingUser) {
                // If user doesn't exist, insert the new user
                const insertResult = await static.db.insertData('users', {
                    google_id: id,
                    name: displayName,
                    email: email,
                    profile_image: photo,
                });

                if (!insertResult.status) {
                    return done(insertResult.error, null);
                }

                const newUser = await static.db.fetchDataByValue('users', 'google_id', id, '*');
                return done(null, newUser.data[0]); // Return the newly created user
            }

            return done(null, existingUser);
        } catch (err) {
            return done(err, null);
        }
    }
));

const isValidPhoneNumber = (value) => {
    return /^\+?[1-9]\d{1,14}$/.test(value);
};

// Validation functions for registration
const registerValidationRules = () => [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('Confirm password is required')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords must match'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('phone_number')
        .notEmpty()
        .withMessage('Phone number is required')
        .custom(isValidPhoneNumber)
        .withMessage('Please enter a valid phone number')
];

const loginValidationRules = () => [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

oauthRoute.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// OAuth callback route to issue JWT after successful Google login
oauthRoute.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        const token = createToken(req.user);
        res.status(201).json({
            message: 'google oauth successful', token, accessToken: { method: "google", accessFiled: "clinite" }
        });
    }
);


// Register route
registerRoute.post('/', registerValidationRules(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const { username, password, email, phone_number } = req.body;

        const userId = uuidv4();

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await static.db.insertData('user', {
            userId,
            username,
            email,
            phone_number,
            password: hashedPassword
        });

        if (!result.status) {
            throw new Error('User registration failed or ' + result.error.message);
        }

        const token = createToken({ id: userId, username, email });
        res.status(201).json({
            message: 'Registration successful', token, accessToken: { method: "email", accessFiled: "clinite" }
        });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
});

// Login route with form-based login
loginRoute.post('/', loginValidationRules(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;

        // Fetch the user from the database by username
        const data = await static.db.fetchDataByValue('user', 'username', username);

        if (!data.data || data.data.length === 0) {
            throw new Error('Invalid username or password');
        }

        const user = data.data[0];

        // Compare the hashed password with the provided password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid username or password');
        }

        // Issue JWT token upon successful login
        const token = createToken(user);
        res.status(201).json({
            message: 'login successful', token, accessToken: { method: "email", accessFiled: "clinite" }
        });
    } catch (error) {
        res.status(400).json({ message: `Error: ${error.message}` });
    }
});

// // Route for logging out the user
// logoutRoute.get('/', (req, res) => {
//     // To log out, client-side should clear the JWT (e.g., remove from localStorage)
//     res.status(200).json({ message: 'Logged out successfully' });
// });

module.exports = { loginRoute, registerRoute, oauthRoute };
