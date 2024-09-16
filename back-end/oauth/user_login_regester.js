const express = require('express');
const { check, validationResult } = require('express-validator');

const loginRoute = express.Router();
const registerRoute = express.Router();

// Middleware for parsing JSON bodies
loginRoute.use(express.json());
registerRoute.use(express.json());

// Login route
loginRoute.post('/', [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // const { username, password } = req.body; check with data base

});

// Register route
registerRoute.post('/', [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords must match')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // const { username, password } = req.body; for the data base

    // Basic registration logic (replace with real user creation logic)
    res.status(200).json({ message: 'Registration successful' });
});

module.exports = { loginRoute, registerRoute };
