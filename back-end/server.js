const express = require('express');
const path = require('path');
const authenticateJWT = require('./security/jwt');
const port = process.env.PORT || 5000;

const { loginRoute, registerRoute, oauthRoute } = require('./oauth/user_login_regester');

const expressapp = express();
expressapp.use(express.json());

// Uncomment for serving static files
// expressapp.use(express.static(path.join(__dirname, 'build')));

// Define routes irom imports
expressapp.use('/login', loginRoute);
expressapp.use('/register', registerRoute);
expressapp.use('/google', oauthRoute);

//  Define routes created here 
expressapp.get('/admin', (req, res) => {
    res.json({
        woo: 223,
    });
});

expressapp.get('/home', (req, res) => {
    res.json({
        woo: 223,
    });
});

// Error handling middleware
expressapp.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
expressapp.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});
