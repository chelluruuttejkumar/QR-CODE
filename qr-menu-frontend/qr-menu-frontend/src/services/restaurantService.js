import axios from "axios";

const API = "http://localhost:5000/api";

export const getRestaurantMenu = async (restaurantId) => {
  const response = await axios.get(
    `${API}/restaurants/${restaurantId}/menu`
  );

  return response.data;
};