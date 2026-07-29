require("dotenv").config();

const dns = require("dns");

// Sử dụng DNS của Google
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const express = require("express");

const methodOverride = require("method-override");

const authRoutes = require("./routes/auth.routes");

const session = require("express-session");

const { MongoStore } = require("connect-mongo");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(
    session({
        secret: process.env.SESSION_SECRET || "photo-gallery-secret",

        resave: false,

        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        }),

        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 ngày
        }
    })
);

app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;

    next();
});
app.use("/auth", authRoutes);       

const PORT = process.env.PORT || 3000;

const { errorHandler } = require("./middleware/error.middleware");
const photoRoutes = require("./routes/photo.routes");
const categoryRoutes = require("./routes/category.routes");
const webRoutes = require("./routes/web.routes");

const connectDB = require("./config/database");




connectDB();

app.set("view engine", "ejs");  

app.use("/photos", photoRoutes);

app.use("/categories", categoryRoutes);

app.use("/", webRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});