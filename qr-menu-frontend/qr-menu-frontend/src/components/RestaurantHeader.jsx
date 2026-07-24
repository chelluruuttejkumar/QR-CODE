import "../styles/restaurantHeader.css";

function RestaurantHeader({ restaurant }) {
  const logoUrl = restaurant?.logo
    ? `http://localhost:5000/uploads/${restaurant.logo}`
    : "/restaurant-logo.png";

  return (
    <div className="restaurant-header">

      <img
        src={logoUrl}
        alt="Chelluru Enterprise"
        className="restaurant-logo"
      />

      <div className="restaurant-details">

        <h1>Chelluru Enterprise</h1>

        <p>{restaurant?.address}</p>

        <p>📞 +91 8142731739</p>

      </div>

    </div>
  );
}

export default RestaurantHeader;