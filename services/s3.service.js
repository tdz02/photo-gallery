const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const s3 = require("../config/s3");

const {
    PutObjectCommand,
    DeleteObjectCommand
} = require("@aws-sdk/client-s3");

exports.uploadImage = async (file) => {

    if (!file) {
        throw new Error("Image file is required");
    }

    let fileBody;

    // Trường hợp Multer dùng memoryStorage
    if (Buffer.isBuffer(file.buffer) && file.buffer.length > 0) {

        fileBody = file.buffer;

    // Trường hợp Multer dùng diskStorage
    } else if (file.path) {

        fileBody = await fs.readFile(file.path);

    } else {

        throw new Error("Uploaded image has no readable content");

    }

    if (fileBody.length === 0) {
        throw new Error("Uploaded image is empty");
    }

    const extension = path
        .extname(file.originalname)
        .toLowerCase();

    const imageKey =
        `photos/${Date.now()}-${crypto.randomUUID()}${extension}`;

    const contentType =
        file.mimetype === "image/pjpeg"
            ? "image/jpeg"
            : file.mimetype;

    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageKey,
            Body: fileBody,
            ContentType: contentType,
            ContentLength: fileBody.length
        })
    );

    // Nếu Multer lưu file tạm trên ổ đĩa thì xóa sau khi upload lên S3
    if (file.path) {
        await fs.unlink(file.path).catch(() => {});
    }

    return {
        imageKey,
        imageUrl:
            `https://${process.env.AWS_BUCKET_NAME}` +
            `.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`
    };
};

exports.deleteImage = async (imageKey) => {

    if (!imageKey) {
        return;
    }

    await s3.send(
        new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageKey
        })
    );

};