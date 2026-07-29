const express = require("express");

const router = express.Router();

const webController = require("../controllers/web.controller");
const photoController = require("../controllers/photo.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.get("/", webController.home);

router.get("/about", webController.about);

router.get("/contact", webController.contact);

router.get("/gallery", photoController.renderGallery);



router.get("/login", webController.login);

module.exports = router;