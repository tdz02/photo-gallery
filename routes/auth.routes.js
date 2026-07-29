const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

router.get(
    "/register",
    authController.showRegisterPage
);

router.post(
    "/register",
    authController.registerUser
);

module.exports = router;