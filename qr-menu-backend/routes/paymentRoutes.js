const express = require("express");

const router = express.Router();

const {
  createPaymentOrder,
  verifyPayment,
} = require("../controllers/paymentController");

router.post("/payment/create-order", createPaymentOrder);

router.post("/payment/verify", verifyPayment);

module.exports = router;