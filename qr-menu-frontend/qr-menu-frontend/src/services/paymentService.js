import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "https://qr-code-02fo.onrender.com/api";

console.log("Payment API:", API);

// Create Razorpay Order
export const createPaymentOrder = async (amount) => {
  const response = await axios.post(
    `${API}/payment/create-order`,
    {
      amount,
    }
  );

  return response.data;
};

// Verify Payment
export const verifyPayment = async (paymentData) => {
  const response = await axios.post(
    `${API}/payment/verify`,
    paymentData
  );

  return response.data;
};