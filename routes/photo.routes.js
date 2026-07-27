const express = require("express");
const router = express.Router();

const photoController = require("../controllers/photo.controller");

router.get("/", photoController.getAllPhotos);

router.get("/:id", photoController.getPhotoById);

router.post("/", photoController.createPhoto);

router.put("/:id", photoController.updatePhoto);

router.delete("/:id", photoController.deletePhoto);

module.exports = router;