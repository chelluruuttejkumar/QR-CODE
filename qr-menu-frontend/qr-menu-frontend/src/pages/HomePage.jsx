import QRCode from "react-qr-code";
import "./../styles/home.css";

function HomePage() {

  const menuUrl =
    "https://qr-code-dusky-theta.vercel.app/menu/1";

  return (

    <div className="home-container">

      <div className="home-card">

        <img
          src="/restaurant-logo.png"
          alt="Restaurant Logo"
          className="restaurant-logo"
        />

        <h1>Chelluru Enterprise</h1>

        <p>
          Scan QR Code to View Menu
        </p>

        <QRCode
          value={menuUrl}
          size={250}
        />

      </div>

    </div>

  );
}

export default HomePage;