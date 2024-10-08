require('dotenv').config()
const express = require('express');
const path = require('path');
const authenticateJWT = require('./security/jwt');
const port = process.env.PORT || 5001;
const cors = require('cors');



// importing route from there js file
const { loginRoute, registerRoute, oauthRoute, callback, forgetpassword, verifyEmail, resetpassword } = require('./oauth/user_login_regester');
const { DeleteTable, resourceSetterRoute, servceSetterRoute, employsetterRoute, updateResoureRoute, updateServceRoute, updateEmployRoute } = require('./adminRoutes/setter/adminRouteSetter');


const expressapp = express();

expressapp.use(cors());
expressapp.use(express.json());

// Uncomment for serving static files
// expressapp.use(express.static(path.join(__dirname, 'build')));


// Define routes imported
expressapp.use('/login', loginRoute);
expressapp.use('/register', registerRoute);
expressapp.use('/oauth', oauthRoute);
expressapp.use('/oauth/google/callback', callback);
expressapp.use('/forgetPassword', forgetpassword);
expressapp.use('./verifyEmail', verifyEmail)
expressapp.use('./resetpassword', resetpassword)

// admin routes
expressapp.use('/setresource', resourceSetterRoute);
expressapp.use('/setservce', servceSetterRoute);
expressapp.use('/setemploy', employsetterRoute);
expressapp.use('/updateResource', updateResoureRoute);
expressapp.use('/updateServce', updateServceRoute);
expressapp.use('/updateEmploy', updateEmployRoute);
expressapp.use('/delete', DeleteTable);




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
    res.status(500).json({ message: "something wrong in our end  refresh the page " });
});

// Start the server
expressapp.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});
