const express = require('express');
const expressapp = express();
const path = require('path');
const port = process.env.PORT || 5000;

const { loginRoute, registerRoute } = require('./oauth/user_login_regester');


expressapp.use(express.json());
//expressapp.use(express.static(path.join(__dirname, 'build')));

expressapp.use('/login', loginRoute);
expressapp.use('/register', registerRoute);

expressapp.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.json({
        woo: 223
    })
});

expressapp.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});