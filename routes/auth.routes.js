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

router.get(
    "/login",
    authController.showLoginPage
);

router.post(
    "/login",
    authController.loginUser
);

router.post(
    "/logout",
    authController.logoutUser
);

module.exports = router;