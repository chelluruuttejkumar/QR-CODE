import axios from "axios";

const API = "http://localhost:5000/api";

export const placeOrder = async (orderData) => {
  const response = await axios.post(`${API}/orders`, orderData);
  return response.data;
};