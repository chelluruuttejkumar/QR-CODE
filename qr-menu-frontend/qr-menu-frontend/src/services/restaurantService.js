import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getRestaurantMenu = async (restaurantId) => {
  const response = await axios.get(
    `${API}/api/restaurants/${restaurantId}/menu`
  );

  return response.data;
};