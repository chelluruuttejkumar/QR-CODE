import React from "react";
import "../styles/RestaurantHeader.css";

function RestaurantHeader({ restaurant }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const logoUrl = restaurant?.logo
    ? `${API_URL}/uploads/logo/${restaurant.logo}`
    : "/restaurant-logo.png";

  return (
    <div className="restaurant-header">
      <div className="restaurant-left">
        <img
          src={logoUrl}
          alt="Restaurant Logo"
          className="restaurant-logo"
          onError={(e) => {
            e.target.src = "/restaurant-logo.png";
          }}
        />
      </div>

      <div className="restaurant-right">
        <h1>{restaurant?.restaurant_name}</h1>

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