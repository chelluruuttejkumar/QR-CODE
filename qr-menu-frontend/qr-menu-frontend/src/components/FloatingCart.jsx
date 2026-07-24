import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/useCart";
import "../styles/floatingCart.css";

function FloatingCart() {
  const navigate = useNavigate();
  const { menuId } = useParams();

  const {
    totalItems,
    totalPrice
  } = useCart();

  if (totalItems === 0) {
    return null;
  }

  return (
    <div
      className="floating-cart"
      onClick={() =>
        navigate("/cart", {
          state: {
            menuId,
          },
        })
      }
    >
      <div>🛒 {totalItems} Item(s)</div>

      <div>₹ {totalPrice}</div>

      <div>View Cart →</div>
    </div>
  );
}

export default FloatingCart;