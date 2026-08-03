const orderService = require("../services/orderService");

// Customer
exports.placeOrder = async (req, res) => {
  try {
    const order = await orderService.placeOrder(req.body);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Admin
exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await orderService.updateOrderStatus(id, status);

    res.json({
      success: true,
      message: "Order Updated Successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};