const { body, validationResult } = require("express-validator");

// ===============================
// Photo Validation Rules
// ===============================

exports.validateCreatePhoto = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("imageUrl")
        .isURL()
        .withMessage("Image URL must be valid"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")

];

// ===============================
// Common Validation Error Handler
// ===============================

exports.handleValidationErrors = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({

        success: false,

        errors: errors.array()

    });

};