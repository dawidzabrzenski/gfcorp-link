import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getGroups = async (token) => {};

export const getPermissions = async (token) => {
  const response = await axios.get(`${API_URL}/api/permissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.permissions;
};
