const express = require("express");

const router = express.Router();

const webController = require("../controllers/web.controller");

router.get("/", webController.home);

router.get("/about", webController.about);

router.get("/contact", webController.contact);

router.get("/gallery", webController.gallery);

router.get("/login", webController.login);

module.exports = router;