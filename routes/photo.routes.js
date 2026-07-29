const express = require("express");
const router = express.Router();
const { requireImage } = require("../middleware/file.middleware");
const photoController = require("../controllers/photo.controller");
const upload = require("../middleware/upload.middleware.js");
const {
    validateCreatePhoto,
    handleValidationErrors
} = require("../middleware/validation.middleware"); 
const {
    requireAuth,
    requirePhotoOwner
} = require("../middleware/auth.middleware");



router.get(
    "/upload",
     requireAuth,      
     photoController.renderUploadPage
    );


router.get("/view/:id", photoController.renderPhoto);

router.get("/", photoController.getAllPhotos);

router.get(
    "/:id/edit",
    requireAuth,
    requirePhotoOwner,
    photoController.renderEditPage
);

router.get("/:id", photoController.getPhotoById);

router.get(
    "/",
    photoController.getAllPhotos
);


router.post(
    "/",
    upload.single("image"),
    requireImage,
    validateCreatePhoto,
    handleValidationErrors,
    photoController.createPhoto
);

router.post(
    "/:id/like",
    requireAuth,
    photoController.likePhoto
);

router.put(
    "/:id",
    requireAuth,
    requirePhotoOwner,
    photoController.updatePhoto
);

router.delete(
    "/:id",
    requireAuth,
    requirePhotoOwner,
    photoController.deletePhoto
);


module.exports = router;