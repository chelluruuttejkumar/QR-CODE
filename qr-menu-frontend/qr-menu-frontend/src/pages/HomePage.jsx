import QRCode from "react-qr-code";
import "../styles/home.css";

function HomePage() {
  const menuUrl =
    "https://chelluruuttejkumarqr.vercel.app/menu/1";

  return (
    <div className="home-container">

      <div className="home-card">

        <h1>Chelluru Enterprise</h1>

        <h3>Scan QR Code To View Menu</h3>

        <QRCode
          value={menuUrl}
          size={250}
        />

      </div>

    </div>
  );
}

export default HomePage;