const Photo = require("../models/photo.model");
const { asyncHandler } = require("../middleware/async.middleware");
const Category = require("../models/category.model");


exports.createPhoto = asyncHandler(async (req, res) => {

    const { title, description, category } = req.body;

    await Photo.create({

        title,

        description,

        imageUrl: `/uploads/${req.file.filename}`,

        imageKey: req.file.filename,

        category

    });

    res.redirect("/gallery");

});

exports.getAllPhotos = asyncHandler(async (req, res) => {

    const photos = await Photo.find()
        .populate("category");

    res.status(200).json({

        success: true,

        data: photos

    });

});

exports.getPhotoById = asyncHandler(async (req, res) => {

    const photo = await Photo.findById(req.params.id)
        .populate("category");

    if (!photo) {
        return res.status(404).json({
            success: false,
            message: "Photo not found"
        });
    }

    res.status(200).json({
        success: true,
        data: photo
    });

});

exports.updatePhoto = asyncHandler(async (req, res) => {

    const photo = await Photo.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
            new: true,
            runValidators: true
        }

    );

    if (!photo) {

        return res.status(404).json({

            success: false,

            message: "Photo not found"

        });

    }

    res.status(200).json({

        success: true,

        data: photo

    });

});

exports.deletePhoto = asyncHandler(async (req, res) => {

    const photo = await Photo.findByIdAndDelete(req.params.id);

    if (!photo) {

        return res.status(404).json({

            success: false,

            message: "Photo not found"

        });

    }

    res.status(200).json({

        success: true,

        message: "Photo deleted successfully"

    });
});
 exports.renderGallery = asyncHandler(async (req, res) => {

    const photos = await Photo.find()
        .populate("category")
        .sort({ createdAt: -1 });

    res.render("gallery", {
        title: "Photo Gallery",
        photos
    });

});
exports.renderPhoto = asyncHandler(async (req, res) => {

    const photo = await Photo.findById(req.params.id)
        .populate("category");

    if (!photo) {
        return res.status(404).render("404", {
            message: "Photo not found"
        });
    }

    res.render("photo", {
        title: photo.title,
        photo
    });

});

exports.renderUploadPage = asyncHandler(async (req, res) => {

    const categories = await Category.find();

    res.render("upload", {
        title: "Upload Photo",
        categories
    });

});