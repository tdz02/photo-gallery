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
        password,
        confirmPassword
    } = req.body;

    const errors = [];

    if (!username || !email || !password || !confirmPassword) {
        errors.push("Please fill in all fields.");
    }

    if (username && username.trim().length < 3) {
        errors.push("Username must contain at least 3 characters.");
    }

    if (password && password.length < 6) {
        errors.push("Password must contain at least 6 characters.");
    }

    if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
        return res.status(400).render("register", {
            title: "Register",
            errors,
            oldInput: {
                username,
                email
            }
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        email: normalizedEmail
    });

    if (existingUser) {
        return res.status(409).render("register", {
            title: "Register",
            errors: [
                "An account with this email already exists."
            ],
            oldInput: {
                username,
                email: normalizedEmail
            }
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
        username: username.trim(),
        email: normalizedEmail,
        password: hashedPassword
    });

    return res.redirect("/gallery");
});