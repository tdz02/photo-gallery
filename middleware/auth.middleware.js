const mongoose = require("mongoose");
const Photo = require("../models/photo.model");

exports.requireAuth = (req, res, next) => {
    if (req.session?.user) {
        return next();
    }

    const wantsJson =
        req.headers.accept?.includes("application/json");

    if (wantsJson) {
        return res.status(401).json({
            success: false,
            message: "You must log in first"
        });
    }

    return res.redirect("/auth/login");
};

exports.requirePhotoOwner = async (req, res, next) => {
    try {
        const photoId = req.params.id;

        if (!mongoose.isValidObjectId(photoId)) {
            return res.status(400).send("Invalid photo ID");
        }

        const photo = await Photo.findById(photoId);

        if (!photo) {
            return res.status(404).send("Photo not found");
        }

        const currentUserId = req.session.user.id;

        if (
            !photo.owner ||
            photo.owner.toString() !== currentUserId
        ) {
            return res.status(403).send(
                "You are not allowed to modify this photo"
            );
        }

        req.photo = photo;

        return next();
    } catch (error) {
        return next(error);
    }
};