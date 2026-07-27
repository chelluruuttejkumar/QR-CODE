import React from "react";
import "./MenuQRCode.css";

function MenuQRCode({ restaurant }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const qrUrl = `${API_URL}/uploads/qrcodes/${restaurant.id}.png`;

  const logoUrl = restaurant?.logo
    ? `${API_URL}/uploads/logo/${restaurant.logo}`
    : "/restaurant-logo.png";

  return (
    <div className="menu-qr-container">
      <div className="menu-qr-card">

        <img
          src={logoUrl}
          alt="Restaurant Logo"
          className="restaurant-logo"
          onError={(e) => {
            e.target.src = "/restaurant-logo.png";
          }}
        />

        <h1>{restaurant.restaurant_name}</h1>

        <h2>Scan QR Code To View Menu</h2>

        <img
          src={qrUrl}
          alt="Restaurant QR"
          className="qr-image"
        />

      </div>
    </div>
  );
}

export default MenuQRCode;