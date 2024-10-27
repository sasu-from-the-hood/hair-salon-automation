const express = require('express')
const static = require('../../static')
const path = require('path');
const fs = require('fs')
const sharp = require('sharp'); // for the resizing the image and compressing it to figs
const { authenticateJWT } = require('../../security/jwt');
const { v4: uuidv4 } = require('uuid');
const { table } = require('console');


// setting the routes
const resourceSetterRoute = express.Router()
const servceSetterRoute = express.Router()
const employsetterRoute = express.Router()

// setting the routes for update
const updateResoureRoute = express.Router()
const updateServceRoute = express.Router()
const updateEmployRoute = express.Router()

// delete a row route 
const DeleteTable = express.Router();


// middlewaver to json converter
resourceSetterRoute.use(express.json())
servceSetterRoute.use(express.json())
employsetterRoute.use(express.json())


const validateAndSanitizeMiddleware = async (req, res, next) => {
    try {
        req.body = await static.ValidatorData.validateAndSanitize(req.body, {
            // resource inputs validate for setter and update 
            name: { type: 'string' },
            model: { type: 'pattern', pattern: '[a-zA-Z0-9]+' },
            amount: { type: 'number' },
            action: { type: 'enum', enum: ['necessary', 'unnecessary'] },
            usage_amount: { type: 'number' },

            // employ inputs validate for setter and update 
            fristName: { type: "string", minLength: 1, maxLength: 50 },
            lastName: { type: "string", minLength: 1, maxLength: 50 },
            email: { type: "email" },
            phoneNumber: { type: 'pattern', pattern: '^\\d{3}\\d{3}\\d{4}$' },


            // service inputs validate for setter and update 
            serviceName: { type: "string", minLength: 1, maxLength: 50 },
            serviceDescription: { type: "string", minLength: 1, maxLength: 50 },
            servicePrice: { type: 'number' },
            // serivceStep : {type : ""}

            // for the delete route
            table: { type: "string", minLength: 1 }

        });
        next();
    } catch (error) {
        res.status(400).json({ message: 'input error ', errors: error.message });
    }
};


// setter routes here 

resourceSetterRoute.post("/", validateAndSanitizeMiddleware, (req, res) => {
    try {
        static.db.upsertData("resource", { ...req.body})
        res.status(200).json({
            message: "added the resource succssfully"
        })
    } catch (error) {
        return res.status(400).json({ message: ' error ', errors: error.message });
    }
})

servceSetterRoute.post("/", authenticateJWT, validateAndSanitizeMiddleware, (req, res) => {
    try {
        static.db.upsertData("servce", { ...req.body, idPointer: uuidv4() })
        res.status(200).json({
            message: "added the servce succssfully"
        })
    } catch (error) {
        res.status(400).json({ message: ' error ', errors: error.message });
    }

})



employsetterRoute.post('/', authenticateJWT, validateAndSanitizeMiddleware, async (req, res) => {
    try {
        if (!req.file.originalname || !req.file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return res.status(400).json({
                filed: "image_path",
                errorMessage: "invalid image format or wrong input"
            })
        }

        const uploadDir = '../uploads/images';
        const filename = path.basename(req.file.originalname);
        const filePath = path.join(uploadDir, filename);

        // Compress the image
        await sharp(req.file.buffer)
            .resize(800) // adjust the width to your liking
            .jpeg({ quality: 80 }) // adjust the quality to your liking
            .toFile(filePath);

        req.body.image_path = filePath;

        static.db.upsertData("employ", { ...req.body, idPointer: uuidv4() })

        res.status(200).json({
            message: "added successfully"
        })

    } catch (error) {
        return res.status(400).json({ message: ' error ', errors: error.message });
    }


})


// update routes here
updateResoureRoute.post('/', authenticateJWT, validateAndSanitizeMiddleware, (req, res) => {
    try {
        static.db.updateData("resource", req.body, { id: req.body.id })
        res.status(200).json({
            message: "updated successfully"
        })
    }
    catch (error) {
        return res.status(400).json({ message: ' error ', errors: error.message });
    }
})

updateServceRoute.post('/', authenticateJWT, validateAndSanitizeMiddleware, (req, res) => {
    try {
        static.db.updateData("servce", req.body, { id: req.body.id })
        res.status(200).json({
            message: "updated successfully"
        })
    } catch (error) {
        return res.status(400).json({ message: ' error ', errors: error.message });
    }
})

updateEmployRoute.post('/', authenticateJWT, validateAndSanitizeMiddleware, async (req, res) => {
    if (req.file) {
        if (!req.file.originalname || !req.file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return res.status(400).json({
                filed: "image_path",
                errorMessage: "invalid image format or wrong input"
            })
        }

        // Delete the previous image
        if (req.body.image_path) {
            try {
                await fs.unlinkSync(req.body.image_path);
            } catch (err) {
                return res.status(400).json({
                    filed: "image_path",
                    errorMessage: "no regested image found"
                })
            }
        }

        const uploadDir = '../uploads/images';
        const filename = path.basename(req.file.originalname);
        const filePath = path.join(uploadDir, filename);

        // Compress the image
        await sharp(req.file.buffer)
            .resize(800) // adjust the width to your liking
            .jpeg({ quality: 80 }) // adjust the quality to your liking
            .toFile(filePath);

        req.body.image_path = filePath;
    }

    static.db.updateData("employ", req.body, { id: req.body.id })
    res.status(200).json({
        message: "updated successfully"
    })
})



// route to delete the row from id 

DeleteTable.post("/", authenticateJWT, validateAndSanitizeMiddleware, async (req, res) => {

    const { table, id } = req.body
    const message = null

    if (table && id || !table.includes(static.accessTableBlocked)) {
        static.db.deleteData(table, { idPointer: id })
    }
    res.status(300).json(message || {
        error: "",
        null: {
            table: !table,
            id: !id,
            accessFiled: table.includes(static.accessTableBlocked)
        }
    })

})


// exporting route
module.exports = { resourceSetterRoute, servceSetterRoute, employsetterRoute, updateResoureRoute, updateServceRoute, updateEmployRoute, DeleteTable }