const supabase = require("../config/supabase");

const placeOrder = async (req, res) => {
  try {
    const {
      restaurant_id,
      customer_name,
      phone,
      table_number,
      special_instructions,
      payment_method,
      total_amount,
      items,
    } = req.body;

    // Validation
    if (
      !restaurant_id ||
      !customer_name ||
      !phone ||
      !total_amount ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Insert into orders table
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          restaurant_id,
          customer_name,
          phone,
          table_number,
          special_instructions,
          payment_method,
          total_amount,
          status: "Pending",
        },
      ])
      .select()
      .single();

    if (orderError) {
      return res.status(500).json({
        success: false,
        message: orderError.message,
      });
    }

    // Prepare order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    // Insert into order_items table
    const { error: itemError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemError) {
      return res.status(500).json({
        success: false,
        message: itemError.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order.id,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  placeOrder,
};