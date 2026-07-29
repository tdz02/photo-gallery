const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

router.get(
    "/register",
    authController.showRegisterPage
);

const {
    registerValidation
} = require("../middleware/auth.validation");

const {
    handleAuthValidation
} = require("../middleware/validation.middleware");
    
router.post(
    "/register",

    registerValidation,

    handleAuthValidation,

    authController.registerUser
);

module.exports = router;