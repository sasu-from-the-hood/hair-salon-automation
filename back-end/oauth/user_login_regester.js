require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid'); // For unique user IDs
const bcrypt = require('bcrypt'); // For password hashing
const { createTokens } = require('../security/jwt');
const static = require('../static');
const { OAuth2Client } = require('google-auth-library');


const loginRoute = express.Router();
const registerRoute = express.Router();
const oauthRoute = express.Router();
const callback = express.Router();
const forgetpassword = express.Router();
const resetpassword = express.Router();
const verifyEmail = express.Router()
const googleLogin = express.Router()

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

            if (!existingUser.length) {
                // If user doesn't exist, insert the new user
                const insertResult = await static.db.insertData('user', {
                    userId: id,
                    username: displayName,
                    email: email,
                    image_path: photo,
                    method: "google",
                    verify: true

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
                    return (!/^\+?[1-9]\d{1,14}$/.test(value)) ? new Error("phone number invild")
                        : value
                }
            },
            confirm_password: {
                type: "custom",
                function: (value) => {
                    req.body.password == req.body.confirm_password ? new Error("password and confirm_password does not macth ")
                        : req.body.confirm_password
                }
            },
            tokenId: { type: "string" }
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

        const user = req.user[0];

        await static.email.sendEmail(user.email, "wellcome", `
            <h1>Welcome, ${user.username}!</h1>
            <p>Thank you for signing up. Please finsh the registration process</p>
            <p>If you did not sign up for this account, please ignore this email.</p>
            <p>Thank you!</p>
        `);

        const token = await createTokens(req.user);

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

        const result = await static.db.fetchDataByValue("user", { email, phone_number }, "or");
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

        const verificationUrl = `${req.protocol}://${req.get('host')}/reset-password?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone_number)}`;


        await static.email.sendEmail(email, "Verify Your Email Address", `
            <h1>Welcome, ${name}!</h1>
            <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
            <a href="${verificationUrl}" style="display:inline-block;padding:10px 20px;background-color:#4f46e5;color:#fff;border-radius:5px;text-decoration:none;">
                Verify Email
            </a>
            <p>Once your email is verified, you will be able to access all of the features of our platform.</p>
            <p>If you did not sign up for this account, please ignore this email.</p>
            <p>Thank you!</p>
        `);


        const token = await createTokens({ id: userId, name, email });
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
    try {
        const { email, password, rememberMe } = req.body;

        const message_data = await admin_checker(email, password, rememberMe, res) || null;

        if (message_data) {
            return res.status(201).json(message_data);
        }

        const data = await static.db.fetchDataByValue("user", { email });

        if (!data.data || data.data.length === 0) {
            throw new Error(JSON.stringify({ errorMessage: 'Invalid email', field: "email" }));
        }

        const users = Array.isArray(data.data[0]) ? data.data[0] : data.data;

        const user = await users.find(async (user) => {
            const isMatch = await bcrypt.compare(password, user.password);
            return isMatch; // Find will return the user when the password matches
        });


        res.status(200).json({
            message: 'Login successful',
            token: await createTokens(user),
            accessToken: { method: "email", accessField: "client" },
            Redirect: "/home",
            rememberMe
        });
    } catch (error) {
        return res.status(400).json({ errors: JSON.parse(error.message) });
    }
});

/**
 * User google Login Route
 */
googleLogin.post('/google-login', async (req, res) => {
    try {
        const { tokenId } = req.body;
        const client = new OAuth2Client(CLIENT_ID);

        // Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const username = payload.name;

        const data = await static.db.fetchDataByValue("user", { email, username });

        if (!data.data || data.data.length === 0) {
            return res.status(400).json({ error: 'User not found. Please sign up first.' });
        }

        const user = data.data[0];

        const token = await createTokens(user);

        return res.status(200).json({
            message: 'Login successful',
            token,
            accessToken: { method: 'google', accessField: 'client' },
            Redirect: '/home',
            rememberMe: true,
        });
    } catch (error) {
        console.error('Google login error:', error);
        return res.status(400).json({ error: 'Invalid Google login. Please try again.' });
    }
});


/**
 * 
 * route for forget password
 * 
 */forgetpassword.post("/", login_registerValidation, async (req, res) => {
    try {
        const { email, phone_number, password } = req.body;

        const result = await static.db.fetchDataByValue("user", { email, phone_number: Number(phone_number) });

        if (!result.data || result.data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user_not_found"
            });
        }

        const token = uuidv4();
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

        // Send password reset email
        await static.email.sendEmail(email, "Resetting password", `
            <h1>Reset Your Password</h1>
            <p>You requested to reset your password. Please click the link below to reset it:</p>
            <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background-color:#4f46e5;color:#fff;border-radius:5px;text-decoration:none;">
                Reset Password
            </a>
            <p>If you press Reset Password it will redirect you to login, just login with email and reset password.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>
        `);

        // Add reset request to array
        const reset = new static();
        reset.addResetRequest({ email, phone_number, password, token });

        return res.status(200).json({
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "An error occurred while processing your request."
        });
    }
});


resetpassword.get("/", async (req, res) => {
    const { email, token } = req.query;
    const resetEntry = await static.resettingPasswordArray.filter(item =>
        item.data.email === email && item.data.token === token
    );

    if (resetEntry) {

        const hashedPassword = await bcrypt.hash(resetEntry.data.password, 10);

        if (!resetEntry) {
            return res.status(400).json({ message: "erorr on the restting password try agin" });
        }

        await static.db.upsertData("user", { email, password: hashedPassword, phone_number: resetEntry.data.phone_number });

        // Remove an entry by email
        static.resettingPasswordArray = static.resettingPasswordArray.filter(item => item.data.email !== email);

        res.redirect('/sign-in');
    }
})


/**
 * 
 * verify the email
 */

verifyEmail.get("/", async (req, res) => {
    const { email, phone } = req.query
    try {
        await static.db.upsertData("user", { email, phone_number: phone, verify: true })
    } catch (e) {
        res.redirect('/sign-in');
    }

})



module.exports = { loginRoute, registerRoute, oauthRoute, callback, forgetpassword, verifyEmail, resetpassword, googleLogin };

/**
 * admin checker route
 * 
 * */

const admin_checker = async (email, password, rememberMe, res) => {

    const data = await static.db.fetchDataByValue("admin", { email });

    if (!data.data || data.data.length === 0) {
        return null
    }

    const user = data.data[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return null
    }

    user = { id: user.userId, username: user.username, email: user.email };

    return {
        message: 'Login successful',
        token: await createTokens(user),
        accessToken: { method: "email", accessField: "admin" },
        Redirect: "/admin",
        rememberMe
    }

}