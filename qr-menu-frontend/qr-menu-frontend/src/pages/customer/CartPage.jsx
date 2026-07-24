import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/useCart";
import "../../styles/cart.css";

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuId = location.state?.menuId;

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const gst = Number((totalPrice * 0.05).toFixed(2));
  const grandTotal = totalPrice + gst;

  return (
    <div className="cart-page">

      <button
        className="back-btn"
        onClick={() => navigate(`/menu/${menuId}`)}
      >
        ← Back to Menu
      </button>

      <h1 className="cart-title">
        🛒 Your Cart ({cartItems.length} Item{cartItems.length !== 1 ? "s" : ""})
      </h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          {cartItems.map((item) => {
            const imageUrl = item.image
              ? `http://localhost:5000/uploads/food/${item.image}`
              : "https://via.placeholder.com/120x100?text=Food";

            return (
              <div
                className="cart-item"
                key={item.id}
              >

                <div className="cart-image">
                  <img
                    src={imageUrl}
                    alt={item.menu_name}
                  />
                </div>

                <div className="cart-info">

                  <div className="food-type">
                    {item.food_type === "Veg" ? (
                      <span className="veg">🟢 Veg</span>
                    ) : (
                      <span className="non-veg">🔴 Non-Veg</span>
                    )}
                  </div>

                  <h3>{item.menu_name}</h3>

                  <p>{item.description}</p>

                  <p>⭐ {item.rating || 4.5}</p>

                  <div className="cart-price">
                    ₹ {item.price}
                  </div>

                </div>

                <div className="quantity">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>

                </div>

              </div>
            );
          })}

          <div className="bill">

            <h2>Bill Details</h2>

            <div className="bill-row">
              <span>Subtotal</span>
              <span>₹ {totalPrice.toFixed(2)}</span>
            </div>

            <div className="bill-row">
              <span>GST (5%)</span>
              <span>₹ {gst.toFixed(2)}</span>
            </div>

            <hr />

            <div
              className="bill-row"
              style={{
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              <span>Grand Total</span>
              <span>₹ {grandTotal.toFixed(2)}</span>
            </div>

           <button
  className="checkout-btn"
  onClick={() =>
    navigate("/checkout", {
      state: {
        menuId: menuId,
        restaurantId: location.state?.restaurantId,
      },
    })
  }
>
  Proceed to Checkout →
</button>

          </div>
        </>
      )}

    </div>
  );
}

export default CartPage;