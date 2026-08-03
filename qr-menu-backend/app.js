const express = require("express");
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurantRoutes");
const path = require("path");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");


require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api", paymentRoutes);

app.use(
    "/qrcodes",
    express.static("uploads/qrcodes")
);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(
    "/api",
    require("./routes/menuRoutes")
);
app.use("/api", adminRoutes);

app.use("/api", restaurantRoutes);

app.use("/api", orderRoutes);
app.use("/api", adminOrderRoutes);
app.listen(5000,()=>{
    console.log("Server running on port 5000");
});
