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