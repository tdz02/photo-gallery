const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/category.controller");

const { body } = require("express-validator");

const {
    handleValidationErrors
} = require("../middleware/validation.middleware");

router.get("/", categoryController.getAllCategories);

router.get("/test-error", (req, res, next) => {

    next(new Error("Đây là lỗi thử nghiệm"));

});

router.get("/:id", categoryController.getCategoryById);

router.post(
    "/",

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required"),

    handleValidationErrors,

    categoryController.createCategory
);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);


module.exports = router;