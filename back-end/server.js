const expressapp = require('./main/expressapp')
const port = process.env.PORT || 5001;


expressapp.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});
