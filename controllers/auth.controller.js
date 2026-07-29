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

exports.showLoginPage = asyncHandler(async (req, res) => {
    return res.render("login", {
        title: "Login",
        errors: [],
        oldInput: {}
    });
});

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
        email: normalizedEmail
    });

    if (!user) {
        return res.status(401).render("login", {
            title: "Login",
            errors: [
                "Email or password is incorrect."
            ],
            oldInput: {
                email: normalizedEmail
            }
        });
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatches) {
        return res.status(401).render("login", {
            title: "Login",
            errors: [
                "Email or password is incorrect."
            ],
            oldInput: {
                email: normalizedEmail
            }
        });
    }

    req.session.user = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role
    };

    return req.session.save((error) => {
        if (error) {
            return res.status(500).send(
                "Could not create login session."
            );
        }

        return res.redirect("/gallery");
    });
});

exports.logoutUser = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }

        res.clearCookie("connect.sid");

        return res.redirect("/auth/login");
    });
};