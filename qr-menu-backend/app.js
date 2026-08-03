const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Static folders
app.use("/qrcodes", express.static("uploads/qrcodes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", paymentRoutes);
app.use("/api", require("./routes/menuRoutes"));
app.use("/api", restaurantRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoutes);
app.use("/api", adminRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});