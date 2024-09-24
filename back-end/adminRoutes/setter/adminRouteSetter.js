const express = require('express')
const static = require('../../static')

// setting the routes
const resourceSetterRoute = express.Router()
const servceSetterRoute = express.Router()
const employsetterRoute = express.Router()


// middlewaver to json converter
resourceSetterRoute.use(express.json())

const validateAndSanitizeMiddleware = async (req, res, next) => {
    try {
        req.sanitizedData = await static.ValidatorData.validateAndSanitize(req.body, {
            // resource inputs validate
            name: { type: 'string' },
            model: { type: 'pattern', pattern: '[a-zA-Z0-9]+' },
            amount: { type: 'number' },
            action: { type: 'enum', enum: ['necessary', 'unnecessary'] },
            usage_amount: { type: 'number' },

            // employ inputs validate
            fristName: { type: "string" },
            middleName: { type: "string" }

            // service inputs validate

        });
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'input error ', errors: error.message });
    }
};


// routes here 

resourceSetterRoute.post("/", validateAndSanitizeMiddleware, (req, res) => {
    static.db.upsertData("resource", req.body)
    res.status(200).json({
        message: "added the resource succssfully"
    })
})

servceSetterRoute.post("/", validateAndSanitizeMiddleware, (req, res) => {
    static.db.upsertData("servce", req.body)
    res.status(200).json({
        message: "added the servce succssfully"
    })
})

employsetterRoute.post('/', validateAndSanitizeMiddleware, (req, res) => {
    static.db.upsertData("employ", req.body)
    res.status(200).json({
        message: "added the succssfully "
    })
})







// exporting route
module.exports = { resourceSetterRoute, servceSetterRoute }