const express = require("express");
const router = express.Router();

const {
    requireImage
} = require("../middleware/file.middleware");

const photoController =
    require("../controllers/photo.controller");

const upload =
    require("../middleware/upload.middleware.js");

const {
    validateCreatePhoto,
    handleValidationErrors
} = require("../middleware/validation.middleware");

const {
    requireAuth,
    requirePhotoOwner
} = require("../middleware/auth.middleware");

// Trang upload
router.get(
    "/upload",
    requireAuth,
    photoController.renderUploadPage
);

// Ảnh của người đang đăng nhập
router.get(
    "/mine",
    requireAuth,
    photoController.renderMyPhotos
);

// Trang chi tiết ảnh
router.get(
    "/view/:id",
    photoController.renderPhotoDetail
);

// Lấy danh sách ảnh dạng JSON
router.get(
    "/",
    photoController.getAllPhotos
);

// Trang chỉnh sửa ảnh
router.get(
    "/:id/edit",
    requireAuth,
    requirePhotoOwner,
    photoController.renderEditPage
);

// Upload ảnh
router.post(
    "/",
    requireAuth,
    upload.single("image"),
    requireImage,
    validateCreatePhoto,
    handleValidationErrors,
    photoController.createPhoto
);

// Like hoặc bỏ like
router.post(
    "/:id/like",
    requireAuth,
    photoController.likePhoto
);

// Cập nhật ảnh
router.put(
    "/:id",
    requireAuth,
    requirePhotoOwner,
    photoController.updatePhoto
);

// Xóa ảnh bằng form HTML
router.post(
    "/:id/delete",
    requireAuth,
    requirePhotoOwner,
    photoController.deletePhoto
);

// Route động chung phải đặt cuối
router.get(
    "/:id",
    photoController.getPhotoById
);

module.exports = router;