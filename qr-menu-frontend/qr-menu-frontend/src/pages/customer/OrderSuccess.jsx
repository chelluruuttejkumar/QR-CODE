import { useLocation, useNavigate } from "react-router-dom";

import "../../styles/success.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;
  const menuId = location.state?.menuId;

  console.log("Location State:", location.state);
console.log("Menu ID:", menuId);

  return (
    <div className="success-container">

      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>Order Placed Successfully</h1>

        <p>
          Thank you for ordering with us.
        </p>

        <div className="order-box">

          <h3>Order Number</h3>

          <h2>#{orderId}</h2>

        </div>

        <div className="success-details">

          <p>Estimated Preparation Time</p>

          <h3>20 - 30 Minutes</h3>

        </div>

        <button
          className="menu-btn"
          onClick={() => navigate(`/menu/${menuId}`)}
        >
          🍽 Continue Ordering
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;