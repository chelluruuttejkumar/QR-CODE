const express = require("express");

const router = express.Router();

const {
  createMenu,
  getMenuById,
} = require("../controllers/menuController");

// Create Menu
router.post("/menu", createMenu);

// Get Menu
router.get("/menu/:id", getMenuById);

module.exports = router;