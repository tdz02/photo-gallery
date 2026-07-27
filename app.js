require("dotenv").config();

const dns = require("dns");

// Sử dụng DNS của Google
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const { errorHandler } = require("./middleware/error.middleware");
const categoryRoutes = require("./routes/category.routes");
const webRoutes = require("./routes/web.routes");

const connectDB = require("./config/database");




connectDB();

app.set("view engine", "ejs");

app.use("/categories", categoryRoutes);

app.use("/", webRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});