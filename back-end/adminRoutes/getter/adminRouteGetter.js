/**
 *  here every routes will a table getter
 */

const express = require('express');
const staticPath = require('../../static');
const authenticateJWTForAdmin = require('../../security/jwt');



// setting the routes for diynmaic table getter
const diynmaicTableGetterRoute = express.Router()
const getresourecelist = express.Router()

// diynmaicTableGetterRoute.use(authenticateJWTForAdmin);
// getresourecelist.use(authenticateJWTForAdmin);


// vildcation for diynmaic table getter
const vildcateTable = async (req, res, next) => {
    try {
        req.body = await staticPath.ValidatorData.validateAndSanitize(req.body, {
            table: { type: "required" },
        });
        next(); // Proceed to the next middleware/handler
    } catch (error) {
        res.status(400).json({ message: "Validation failed", error });
    }
};




diynmaicTableGetterRoute.post("/", vildcateTable, async (req, res) => {
    try {
        const tables = Array.isArray(req.body.tables)
            ? req.body.tables
            : [req.body.tables];

        const data = await Promise.all(
            tables.map(async (element) => {
                if (!staticPath.accessTableBlocked || !element.includes(staticPath.accessTableBlocked)) {
                    return await staticPath.db.fetchData(element);
                }
                return null; // Return null for blocked tables
            })
        );

        res.status(201).json(data.filter(Boolean)); // Filter out null responses
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



getresourecelist.get("/" , async (req, res) => {

    const data = await staticPath.db.fetchData("resource" , "name,model")
    res.status(201).json(data)

})



// exporing the route
module.exports = { diynmaicTableGetterRoute,getresourecelist }