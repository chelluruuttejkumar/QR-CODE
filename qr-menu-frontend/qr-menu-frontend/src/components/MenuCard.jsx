import "../styles/menuCard.css";
import { useCart } from "../context/useCart";


function MenuCard({ item }) {

  const { addToCart } = useCart();

 const imageUrl = item.image
  ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/food/${item.image}`
  : "https://via.placeholder.com/180x150?text=Food";

  return (
    <div className="menu-card">

      {/* Left Side */}
      <div className="menu-info">

        <div className="food-type">
          {item.food_type === "Veg" ? (
            <span className="veg">🟢 Veg</span>
          ) : (
            <span className="non-veg">🔴 Non-Veg</span>
          )}
        </div>

        <h3>{item.menu_name}</h3>

        <p className="description">
          {item.description}
        </p>

        <div className="rating-price">

          <span className="rating">
            ⭐ {item.rating || 4.5}
          </span>

          <span className="price">
            ₹ {item.price}
          </span>

        </div>

      </div>

      {/* Right Side */}
      <div className="image-section">

        <img
          src={imageUrl}
          alt={item.menu_name}
        />

        <button
          className="add-btn"
          onClick={() => addToCart(item)}
        >
          ADD
        </button>

      </div>

    </div>
  );
}

export default MenuCard;