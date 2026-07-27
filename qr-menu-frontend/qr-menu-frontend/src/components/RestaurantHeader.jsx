import "../styles/restaurantHeader.css";

function RestaurantHeader({ restaurant }) {
  // Remove "/api" to get the backend base URL
  const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

  // Restaurant logo URL
  const logoUrl = `${BASE_URL}/uploads/logo/logo.png`;

  return (
    <div className="restaurant-header">

      <div className="restaurant-logo-container">
        <img
          src={logoUrl}
          alt="Restaurant Logo"
          className="restaurant-logo"
          onError={(e) => {
            console.log("Logo not found:", logoUrl);

            e.target.src =
              "https://via.placeholder.com/120x120?text=Restaurant+Logo";
          }}
        />
      </div>

      <div className="restaurant-details">

        <h1 className="restaurant-name">
          {restaurant?.restaurant_name}
        </h1>

        <p className="restaurant-address">
          📍 {restaurant?.address}
        </p>

        <p className="restaurant-phone">
          📞 {restaurant?.phone}
        </p>

      </div>

    </div>
  );
}

export default RestaurantHeader;