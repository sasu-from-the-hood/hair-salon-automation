require('dotenv').config()
const express = require('express');
const path = require('path');
const authenticateJWT = require('../security/jwt');
const cors = require('cors');



// importing route from there js file
const { loginRoute, registerRoute, oauthRoute, callback, forgetpassword, verifyEmail, resetpassword } = require('../oauth/user_login_regester');
const { DeleteTable, resourceSetterRoute, servceSetterRoute, employsetterRoute, updateResoureRoute, updateServceRoute, updateEmployRoute } = require('../adminRoutes/setter/adminRouteSetter');
const { diynmaicTableGetterRoute,getresourecelist }  = require("../adminRoutes/getter/adminRouteGetter")

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
expressapp.use('/api/admin/setresource', resourceSetterRoute); // post
expressapp.use('/api/admin/setservce', servceSetterRoute); // post
expressapp.use('/api/admin/setemploy', employsetterRoute); // post
expressapp.use('/api/admin/updateResource', updateResoureRoute); // post
expressapp.use('/api/admin/updateServce', updateServceRoute); // post
expressapp.use('/api/admin/updateEmploy', updateEmployRoute); // post
expressapp.use('/api/admin/delete', DeleteTable); // delete
expressapp.use('/api/admin/GetResourceName', getresourecelist); // get
expressapp.use('/api/admin/diynmaicTableGetter', diynmaicTableGetterRoute); // post




//  Define routes created here 
expressapp.get('/admin', (req, res) => {
    res.json({
        woo: 223,
    }).sendStatus(200);
});

expressapp.get('/home', (req, res) => {
    res.json({
        woo: 223,
    });
});



// Error handling middleware
expressapp.use((err, req, res, next) => {
    res.status(500).json({ message: "something wrong in our end  refresh the page  " , error :err});
});

module.exports= expressapp


