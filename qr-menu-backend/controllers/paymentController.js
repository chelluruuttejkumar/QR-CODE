const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const supabase = require("../config/supabase");

// ==========================================
// Create Razorpay Order
// ==========================================

const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
};

// ==========================================
// Verify Payment & Save Order
// ==========================================

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      restaurant_id,
      customer_name,
      phone,
      table_number,
      payment_method,
      special_instructions,
      total_amount,
      items,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Save Order

    const { data: order, error } = await supabase
      .from("orders")
      .insert([
        {
          restaurant_id,
          customer_name,
          phone,
          table_number,
          payment_method,
          special_instructions,
          total_amount,

          payment_status: "Paid",
          payment_order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          payment_signature: razorpay_signature,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // Save Order Items

    const orderItems = items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemError) {
      return res.status(500).json({
        success: false,
        message: itemError.message,
      });
    }

    return res.status(200).json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Payment Verification Failed",
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};