import QRCode from "react-qr-code";
import "../styles/home.css";

function MenuQRCode({ menuId }) {
  const menuUrl = `https://chelluruuttejkumarqr.vercel.app/menu/${menuId}`;

  return (
    <div className="home-container">
      <div className="home-card">

        <h1>Chelluru Enterprise</h1>

        <h3>Scan QR Code To View Menu</h3>

        <QRCode
          value={menuUrl}
          size={250}
        />

        <p
          style={{
            marginTop: "20px",
            color: "#666",
            fontSize: "15px",
          }}
        >
          Scan this QR code using your mobile camera to view the restaurant menu.
        </p>

      </div>
    </div>
  );
}

export default MenuQRCode;