const supabase = require("../utils/supabase");

// ===================================
// Customer - Place Order
// ===================================
async function placeOrder(orderData) {
  const {
    restaurant_id,
    customer_name,
    phone,
    table_number,
    special_instructions,
    total_amount,
    payment_method,
    items,
  } = orderData;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        restaurant_id,
        customer_name,
        phone,
        table_number,
        special_instructions,
        total_amount,
        payment_method,
        status: "Pending",
      },
    ])
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = items.map((item) => ({
    order_id: order.id,
    menu_item_id: item.menu_item_id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemError) throw itemError;

  return order;
}

// ===================================
// Admin - Get All Orders
// ===================================
async function getAllOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Get order items for every order
  for (const order of data) {
    const { data: items, error: itemError } = await supabase
      .from("order_items")
      .select(`
        quantity,
        price,
        menu_items (
          menu_name
        )
      `)
      .eq("order_id", order.id);

    if (itemError) throw itemError;

    order.order_items = items;
  }

  return data;
}

// ===================================
// Admin - Update Order Status
// ===================================
async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select();

  if (error) throw error;

  return data;
}

module.exports = {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
};