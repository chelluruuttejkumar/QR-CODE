import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

function AdminOrders() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/orders`);

    if (response.data?.success) {
      setOrders(response.data.orders || []);
    }
  } catch (err) {
    console.error(err);
  }
};
 useEffect(() => {
  const loadOrders = async () => {
    setLoading(true);

    await fetchOrders();

    setLoading(false);
  };

  loadOrders();

  const interval = setInterval(loadOrders, 5000);

  return () => clearInterval(interval);
}, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `${API_URL}/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Orders...</h2>;
  }

  return (
    <div className="admin-orders">

      <h1>Restaurant Orders</h1>

      {orders.map((order) => (

        <div
          className="order-card"
          key={order.id}
        >

          <div className="top">

            <h2>{order.customer_name}</h2>

            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>

          </div>

          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <p>
            <strong>Table:</strong> {order.table_number}
          </p>

          <p>
            <strong>Payment:</strong>{" "}
            {order.payment_status}
          </p>

          <p>
            <strong>Total:</strong> ₹{order.total_amount}
          </p>

          <p>
            <strong>Instructions:</strong>{" "}
            {order.special_instructions || "-"}
          </p>

          <h3>Items</h3>

          <ul>

            {order.order_items.map((item, index) => (

              <li key={index}>
                {item.menu_items.menu_name}
                {" - "}
                Qty {item.quantity}
              </li>

            ))}

          </ul>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(
                order.id,
                e.target.value
              )
            }
          >

            <option>Pending</option>

            <option>Preparing</option>

            <option>Ready</option>

            <option>Delivered</option>

          </select>

        </div>

      ))}

    </div>
  );
}

export default AdminOrders;