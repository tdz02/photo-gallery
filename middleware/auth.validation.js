const { body } = require("express-validator");

exports.registerValidation = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters."),

    body("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match.");
            }

            return true;
        })

];