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
    requireAuth
} = require("../middleware/auth.middleware");


router.get(
    "/upload",
     requireAuth,      
     photoController.renderUploadPage
    );


router.get("/view/:id", photoController.renderPhoto);

router.get("/", photoController.getAllPhotos);

router.get("/edit/:id", photoController.renderEditPage);

router.get("/:id", photoController.getPhotoById);


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
    photoController.likePhoto
);

router.put("/:id", photoController.updatePhoto);

router.delete("/:id", photoController.deletePhoto);


module.exports = router;