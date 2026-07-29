const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const asyncHandler = require("../middleware/async.middleware");

exports.showRegisterPage = asyncHandler(async (req, res) => {
    return res.render("register", {
        title: "Register",
        errors: [],
        oldInput: {}
    });
});

exports.registerUser = asyncHandler(async (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

        return res.status(409).render("register", {

            title: "Register",

            errors: [
                "This email is already registered."
            ],

            oldInput: {
                username,
                email
            }

        });

    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({

        username,

        email,

        password: hashedPassword

    });

    return res.redirect("/gallery");

});