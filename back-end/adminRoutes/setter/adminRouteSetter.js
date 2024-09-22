const express = require('express')
const static = require('../../static')

// setting the routes
const resourceSetterRoute = express.Router()
const servceSetterRoute = express.Router()


// middlewaver to json converter
resourceSetterRoute.use(express.json())

const validateAndSanitizeMiddlewareRESOURCE = (req, res, next) => {
    try {
        req.sanitizedData = static.ValidatorData.validateAndSanitize(req.body, {
            name: { type: 'string' },
            model: { type: 'pattern', pattern: '[a-zA-Z0-9]+' },
            amount: { type: 'number' },
            action: { type: 'enum', enum: ['necessary', 'unnecessary'] },
            usage_amount: { type: 'number' }
        });
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'input error ', errors: error.message });
    }
};


const validateAndSanitizeMiddlewareSERVCE = (req, res, next) => {
    try {
        req.sanitizedData = static.ValidatorData.validateAndSanitize(req.body, {
            name: { type: 'string' },
            model: { type: 'pattern', pattern: '[a-zA-Z0-9]+' },
            amount: { type: 'number' },
            action: { type: 'enum', enum: ['necessary', 'unnecessary'] },
            usage_amount: { type: 'number' }
        });
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'input error ', errors: error.message });
    }
};


// routes here 

resourceSetterRoute.post("/", validateAndSanitizeMiddlewareRESOURCE, (req, res) => {
    // const result = static.db.fetchDataByValue("resource", "name", req.body.name)
    // try {
    //     if (result.status) {
    static.db.upsertData("resource", req.body)
    res.status(200).json({
        message: "updated the resource table"
    })
    // }


    // } catch (error) {

    // }
})

servceSetterRoute.post("/", validateAndSanitizeMiddlewareSERVCE, (req, res) => {
    static.db.upsertData("servce", req.body)
    res.status(200).json({
        message: "updated the servce table"
    })
})





// exporting route
module.exports = { resourceSetterRoute, servceSetterRoute }