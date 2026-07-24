import axios from "axios";

const API = "http://localhost:5000/api";

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