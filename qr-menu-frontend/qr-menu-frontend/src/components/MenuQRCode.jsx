import QRCode from "react-qr-code";

function MenuQRCode({ menuId }) {
  const menuUrl = `https://qr-code-qtdcdz0kj-chelluruuttejkumars-projects.vercel.app/menu/${menuId}`;

  return (
    <div
      style={{
        textAlign: "center",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        margin: "20px auto",
        width: "fit-content",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <h2>📱 Scan to View Menu</h2>

      <QRCode
        value={menuUrl}
        size={220}
      />

      <p
        style={{
          marginTop: "15px",
          color: "#555",
          fontSize: "14px",
        }}
      >
        Scan this QR code to open the menu
      </p>
    </div>
  );
}

export default MenuQRCode;