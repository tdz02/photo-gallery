const Photo = require("../models/photo.model");
const { asyncHandler } = require("../middleware/async.middleware");
const Category = require("../models/category.model");
const { uploadImage, deleteImage } = require("../services/s3.service");


exports.createPhoto = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Image is required"
        });
    }

    if (
        !Buffer.isBuffer(req.file.buffer) ||
        req.file.buffer.length === 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Uploaded image is empty"
        });
    }

    console.log("File size:", req.file.size);
    console.log("Buffer length:", req.file.buffer.length);

    const { imageUrl, imageKey } = await uploadImage(req.file);

    await Photo.create({
        title,
        description,
        imageUrl,
        imageKey,
        category
    });

    return res.redirect("/gallery");
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

    const { title, description, category } = req.body;

    const photo = await Photo.findById(req.params.id);

    if (!photo) {

        return res.status(404).send("Photo not found");

    }

    photo.title = title;
    photo.description = description;
    photo.category = category;

    await photo.save();

    res.redirect("/gallery");

});

exports.deletePhoto = asyncHandler(async (req, res) => {

    const photo = await Photo.findById(req.params.id);

    if (!photo) {

        return res.status(404).send("Photo not found");

    }

    await deleteImage(photo.imageKey);

    await photo.deleteOne();

    res.redirect("/gallery");

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

exports.renderEditPage = asyncHandler(async (req, res) => {

    

    const photo = await Photo.findById(req.params.id);

    if (!photo) {
        return res.status(404).send("Photo not found");
    }

    const categories = await Category.find();

    res.render("edit-photo", {
        title: "Edit Photo",
        photo,
        categories
    });

});