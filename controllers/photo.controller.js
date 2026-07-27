const Photo = require("../models/photo.model");
const { asyncHandler } = require("../middleware/async.middleware");
exports.createPhoto = asyncHandler(async (req, res) => {

const {
        title,
        description,
        imageUrl,
        imageKey,
        category
} = req.body;


const photo = await Photo.create({

    title,

    description,

    imageUrl,

    imageKey,

    category

}); 
res.status(201).json({

    success: true,

    data: photo

});

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