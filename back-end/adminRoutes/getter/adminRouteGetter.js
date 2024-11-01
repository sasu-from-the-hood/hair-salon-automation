/**
 *  here every routes will a table getter
 */

const express = require('express');
const static = require('../../static');
const authenticateJWTForAdmin = require('../../security/jwt');



// setting the routes for diynmaic table getter
const diynmaicTableGetterRoute = express.Router()
const getresourecelist = express.Router()

// vildcation for diynmaic table getter
const vildcateTable = async (req, res, next) => {
    req.body = await static.ValidatorData.validateAndSanitize(req.body, {
        table: { type: "required" },
    })
}




diynmaicTableGetterRoute.post("/", authenticateJWTForAdmin, vildcateTable, async (req, res) => {

    const tables = (Array.isArray(req.body.tables)) ? req.body.tables : [req.body.tables]

    const data = tables.map(async element => {
        if (!element.includes(static.accessTableBlocked)) {
            return await static.db.fetchData(element)
        }
    })

    res.status(201).json(await Promise.all(data))
})


getresourecelist.get("/", authenticateJWTForAdmin , async (req, res) => {

    const data = await static.db.fetchData("resource" , "name,model")
    res.status(201).json(data)

})



// exporing the route
module.exports = { diynmaicTableGetterRoute,getresourecelist }