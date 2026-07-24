const express = require("express");

const router = express.Router();

const {
  getRestaurantMenu,
} = require("../controllers/restaurantController");

router.get(
  "/restaurants/:id/menu",
  getRestaurantMenu
);

module.exports = router;