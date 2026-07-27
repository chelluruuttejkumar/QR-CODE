import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "https://qr-code-02fo.onrender.com/api";

export const placeOrder = async (orderData) => {
  const response = await axios.post(
    `${API}/orders`,
    orderData
  );

  return response.data;
};