import "../styles/restaurantHeader.css";

function RestaurantHeader() {
  const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

  const logoUrl = `${BASE_URL}/uploads/logo/logo.png`;

  return (
    <div className="restaurant-header">

      <div className="restaurant-logo-container">
        <img
          src={logoUrl}
          alt="Restaurant Logo"
          className="restaurant-logo"
          onError={(e) => {
            e.target.src = "/restaurant-logo.png";
          }}
        />
      </div>

      <div className="restaurant-details">
        <h1 className="restaurant-name">
          Chelluru Enterprise
        </h1>

        <p className="restaurant-address">
          📍 Hyderabad
        </p>

        <p className="restaurant-phone">
          📞 +91 8142731739
        </p>
      </div>

    </div>
  );
}

export default RestaurantHeader;