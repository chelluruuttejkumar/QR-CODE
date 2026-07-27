import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "https://qr-code-02fo.onrender.com/api";

console.log("API URL:", API);

export const getRestaurantMenu = async (restaurantId) => {
  const response = await axios.get(
    `${API}/restaurants/${restaurantId}/menu`
  );

  return response.data;
};