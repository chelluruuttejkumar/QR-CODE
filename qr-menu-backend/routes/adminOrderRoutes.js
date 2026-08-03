const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

router.get(
  "/admin/orders",
  orderController.getOrders
);

router.put(
  "/admin/orders/:id",
  orderController.updateStatus
);

module.exports = router;