const s3 = require("../config/s3");

const {
    PutObjectCommand,
    DeleteObjectCommand
} = require("@aws-sdk/client-s3");

exports.uploadImage = async (file) => {

    const imageKey =
        `${Date.now()}-${file.originalname}`;

    await s3.send(

        new PutObjectCommand({

            Bucket: process.env.AWS_BUCKET_NAME,

            Key: imageKey,

            Body: file.buffer,

            ContentType: file.mimetype

        })

    );

    return {

        imageKey,

        imageUrl:
            `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`

    };

};

exports.deleteImage = async (imageKey) => {

    await s3.send(

        new DeleteObjectCommand({

            Bucket: process.env.AWS_BUCKET_NAME,

            Key: imageKey

        })

    );

};