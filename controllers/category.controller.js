const Category = require("../models/category.model");
const { asyncHandler } = require("../middleware/async.middleware");
const {
    sendSuccess,
    sendError
} = require("../utils/response");

// CREATE
exports.createCategory = asyncHandler(async (req, res) => {

    const { name } = req.body;

    const category = await Category.create({ name });

    sendSuccess(

    res,

    category,

    "Category created successfully",

    201

);

});

// READ ALL
exports.getAllCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find();

    sendSuccess(

    res,

    categories,

    "Categories retrieved successfully"

);

});

// READ ONE
exports.getCategoryById = asyncHandler(async (req, res) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
        return sendError(

    res,

    "Category not found",

    404

);
    }

    sendSuccess(

    res,

    category,

    "Category retrieved successfully"

);
});

// UPDATE
exports.updateCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
        id,
        { name },
        {
            new: true,
            runValidators: true
        }
    );

    if (!category) {
        return sendError(

    res,

    "Category not found",

    404

);
    }

    sendSuccess(

    res,

    category,

    "Category updated successfully"

);

});

// DELETE
exports.deleteCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
       return res.status(404).json({

    message:"Category not found"

    });
    }

    sendSuccess(

    res,

    null,

    "Category deleted successfully"

);

});