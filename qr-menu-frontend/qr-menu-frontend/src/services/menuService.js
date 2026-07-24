import api from "./api";

export const getMenuById = async (menuId) => {
  const response = await api.get(`/menu/${menuId}`);
  return response.data.data;
};