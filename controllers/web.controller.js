exports.home = (req, res) => {

    const categories = [
        "Nature",
        "Travel",
        "Animals",
        "Food",
        "Sports",
        "Technology"
    ];

    res.render("home", {
        title: "Photo Gallery",
        message: "Building a Photo Gallery with Node.js",
        version: "1.0.0",
        categories
    });

};
exports.about = (req, res) => {
    res.send("About Photo Gallery");
};

exports.contact = (req, res) => {
    res.send("Contact us");
};

exports.gallery = (req, res) => {
    res.send("Photo Gallery Homepage");
};

exports.login = (req, res) => {
    res.send("Login Page");
};