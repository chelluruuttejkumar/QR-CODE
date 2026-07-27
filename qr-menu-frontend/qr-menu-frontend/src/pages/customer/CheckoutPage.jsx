import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useCart } from "../../context/useCart";

import {
  createPaymentOrder,
  verifyPayment,
} from "../../services/paymentService";

import "../../styles/checkout.css";

function CheckoutPage() {
  const navigate = useNavigate();
 const location = useLocation();

const restaurantId = location.state?.restaurantId || 1;
const menuId = location.state?.menuId;

  const {
    cartItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  const gst = Number((totalPrice * 0.05).toFixed(2));
  const grandTotal = Number((totalPrice + gst).toFixed(2));


<div className="checkout-header">

  <img
  src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/logo/logo.png`}
  alt="Chelluru Enterprise"

    className="checkout-logo"
  />

  <h2>Chelluru Enterprise</h2>

  <p>📞 +91 8142731739</p>

</div>


  const validateForm = () => {
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return false;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Enter a valid 10 digit phone number");
      return false;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Create Razorpay Order
      const response = await createPaymentOrder(grandTotal);

      const order = response.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "Chelluru Enterprises",

        description: "Restaurant Order",

        order_id: order.id,

        prefill: {
          name: customerName,
          contact: phone,
        },

        theme: {
          color: "#16a34a",
        },

        handler: async function (paymentResponse) {
          try {
            const verifyResponse =
              await verifyPayment({

                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,

                restaurant_id: restaurantId,

                customer_name: customerName,

                phone,

                table_number: tableNumber,

                special_instructions: instructions,

                payment_method: "Online",

                total_amount: grandTotal,

                items: cartItems,
              });

            clearCart();

     navigate("/success", {
  state: {
    orderId: verifyResponse.orderId, // or response.orderId
    menuId: menuId,
  },
});
          } catch (err) {
            console.log(err);

            alert("Payment verification failed.");
          }
        },

        modal: {
          ondismiss: function () {
            alert("Payment Cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);

      alert("Unable to initiate payment.");
    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-card">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>Checkout</h1>

        <div className="form-group">
          <label>Customer Name</label>

          <input
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="9876543210"
          />
        </div>

        <div className="form-group">
          <label>Table Number</label>

          <input
            value={tableNumber}
            onChange={(e) =>
              setTableNumber(e.target.value)
            }
            placeholder="A1"
          />
        </div>

        <div className="form-group">
          <label>Special Instructions</label>

          <textarea
            value={instructions}
            onChange={(e) =>
              setInstructions(e.target.value)
            }
            placeholder="Less spicy..."
          />
        </div>

        <div className="bill">

          <div className="bill-row">
            <span>Subtotal</span>

            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>

          <div className="bill-row">
            <span>GST (5%)</span>

            <span>₹ {gst.toFixed(2)}</span>
          </div>

          <hr />

          <div className="bill-row total">
            <span>Total</span>

            <span>₹ {grandTotal.toFixed(2)}</span>
          </div>

        </div>

        <button
          className="place-order-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading
            ? "Please Wait..."
            : `Pay ₹${grandTotal}`}
        </button>

      </div>

    </div>
  );
}

export default CheckoutPage;