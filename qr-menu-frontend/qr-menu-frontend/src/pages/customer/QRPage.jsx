import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

function QRPage() {
  const { menuId } = useParams();

  const menuUrl = `${window.location.origin}/menu/${menuId}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Scan QR to View Menu</h1>

      <QRCode
        value={menuUrl}
        size={260}
      />
    </div>
  );
}

export default QRPage;