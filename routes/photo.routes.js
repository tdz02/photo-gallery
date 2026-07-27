const express = require("express");
const router = express.Router();

const photoController = require("../controllers/photo.controller");

router.post("/", photoController.createPhoto);

module.exports = router;