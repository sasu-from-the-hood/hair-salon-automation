require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid'); // For unique user IDs
const bcrypt = require('bcrypt'); // For password hashing
const { createTokens } = require('../security/jwt');
const static = require('../static');

const loginRoute = express.Router();
const registerRoute = express.Router();
const oauthRoute = express.Router();
const callback = express.Router();

// Middleware for parsing JSON bodies
loginRoute.use(express.json());
registerRoute.use(express.json());

/**
 * Google OAuth 2.0 Strategy
 */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const { id, displayName, emails, photos } = profile;
            const email = emails && emails.length > 0 ? emails[0].value : null;
            const photo = photos && photos.length > 0 ? photos[0].value : null;

            // Check if the user already exists in the database
            const result = await static.db.fetchDataByValue('user', { 'userId': id });
            const existingUser = result.data

            if (!existingUser) {
                // If user doesn't exist, insert the new user
                const insertResult = await static.db.insertData('user', {
                    userId: id,
                    username: displayName,
                    email: email,
                    image_path: photo,
                    method: "google"

                });

                if (!insertResult.status && insertResult.error) {
                    return done(insertResult.error, null);
                }

                const newUser = await static.db.fetchDataByValue('user', { 'id': id });
                return done(null, newUser.data[0]);
            }

            return done(null, existingUser);
        } catch (err) {
            return done(err, null);
        }
    }
));



/**
 * Input validation middleware for login and registration
 */
const login_registerValidation = async (req, res, next) => {
    try {
        res.data = await static.ValidatorData.validateAndSanitize(req.body, {
            username: { type: "string" },
            email: { type: "email" },
            confirm_password: {
                type: "Custom",
                function: (value) => req.body.password === value,
            },
            password: {
                type: "pattern",
                pattern: ".{6,20}",
            },
            phoneNumber: {
                type: 'Custom', function: (value) => {
                    return (!/^\+?[1-9]\d{1,14}$/.test(value)) ? new Error("")
                        : value
                }
            }
        });

        next();
    } catch (errors) {
        return res.status(400).json({ errors: JSON.parse(errors.message) });
    }
};

/**
 * Google OAuth Routes
 */
oauthRoute.get('/', passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.phonenumbers.read']
}));

callback.get('/',
    passport.authenticate('google', { failureRedirect: '/sign-up', session: false }),
    async (req, res) => {
        const token = await createTokens(req.user);
        res.render
        res.status(201).json({
            message: 'Google OAuth successful',
            token,
            accessToken: { method: "google", accessField: "client" },
            Redirect: "/signin"
        });
    }
);

/**
 * User Registration Route
 */
registerRoute.post('/', login_registerValidation, async (req, res) => {
    try {
        const { name, password, email, phone_number } = req.body;

        const result = await static.db.fetchDataByValue("user", { email, phone_number });
        if (result.data.length) throw new Error(JSON.stringify({ errorMessage: 'Your Email Exists', field: "email" }));

        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertResult = await static.db.insertData('user', {
            userId,
            username: name,
            email,
            phone_number,
            password: hashedPassword
        });

        if (!insertResult.status) {
            throw new Error(JSON.stringify({ errorMessage: 'User registration failed try again ', field: "name" }));
        }

        const token = createTokens({ id: userId, name, email });
        res.status(201).json({
            message: 'Registration successful',
            token,
            accessToken: { method: "email", accessField: "client" },
            Redirect: "/home",
            rememberMe: false
        });
    } catch (error) {
        return res.status(400).json({ errors: JSON.parse(error.message) });
    }
});

/**
 * User Login Route
 */
loginRoute.post('/', login_registerValidation, async (req, res) => {

    const message_data = admin_checker(req, res) || null

    if (message_data) {
        res.status(201).json(message_data)
    }

    try {
        const { email, password, rememberMe } = req.body;

        const data = await static.db.fetchDataByValue("user", { email });
        if (!data.data || data.data.length === 0) {
            throw new Error(JSON.stringify({ errorMessage: 'Invalid email', field: "email" }));
        }

        const user = data.data[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error(JSON.stringify({ errorMessage: 'Invalid password', field: "password" }));
        }

        user = { id: userId, username, email };

        const token = createTokens(user);
        res.status(201).json({
            message: 'Login successful',
            token,
            accessToken: { method: "email", accessField: "client" },
            Redirect: "/home",
            rememberMe
        });
    } catch (error) {
        return res.status(400).json({ errors: JSON.parse(error.message) });
    }
});

module.exports = { loginRoute, registerRoute, oauthRoute, callback };


const admin_checker = (req, res) => {

    return null
}