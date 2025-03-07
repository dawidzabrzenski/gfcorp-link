import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:5000";

export const getGroups = async (token) => {
  const res = await axios.get(`${API_URL}/api/groups`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getPermissions = async (token) => {
  const res = await axios.get(`${API_URL}/api/permissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.permissions;
};
