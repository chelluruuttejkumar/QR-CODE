import QRCode from "react-qr-code";
import "./MenuQRCode.css";

function MenuQRCode({ menuId }) {
  const menuUrl = `https://chelluruuttejkumarqr.vercel.app/menu/${menuId}`;

  return (
    <div className="menu-qr-container">
      <div className="menu-qr-card">

        <h1 className="restaurant-name">
          Chelluru Enterprise
        </h1>

        <h2 className="qr-title">
          Scan QR Code To View Menu
        </h2>

        <QRCode
          value={menuUrl}
          size={260}
          bgColor="#ffffff"
          fgColor="#000000"
        />

        <p
          style={{
            marginTop: "20px",
            color: "#666",
            fontSize: "15px",
          }}
        >
          Scan this QR code with your mobile camera to view the menu.
        </p>

      </div>
    </div>
  );
}

export default MenuQRCode;