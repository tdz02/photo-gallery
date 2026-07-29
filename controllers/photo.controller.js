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
    const search = req.query.search?.trim() || "";
    const sort = req.query.sort || "newest";

    const requestedPage = parseInt(req.query.page, 10) || 1;
    const limit = 2;

    const filter = {};

    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    const sortOptions = {
        newest: { createdAt: -1 },
        oldest: { createdAt: 1 },
        title_asc: { title: 1 },
        title_desc: { title: -1 }
    };

    const selectedSort = sortOptions[sort]
        ? sort
        : "newest";

    const totalPhotos = await Photo.countDocuments(filter);

    const totalPages = Math.max(
        1,
        Math.ceil(totalPhotos / limit)
    );

    const currentPage = Math.min(
        Math.max(requestedPage, 1),
        totalPages
    );

    const skip = (currentPage - 1) * limit;

    const photos = await Photo.find(filter)
        .populate("category")
        .sort(sortOptions[selectedSort])
        .skip(skip)
        .limit(limit);

    res.render("gallery", {
        title: "Photo Gallery",
        photos,
        search,
        sort: selectedSort,
        currentPage,
        totalPages,
        totalPhotos
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