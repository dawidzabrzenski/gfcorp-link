import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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

  return res.data;
};

export const getUserPermissions = async (token) => {
  if (!token) {
    throw new Error("Brak tokena autoryzacyjnego");
  }
  const res = await axios.get(`${API_URL}/api/userPermissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.userPermissions;
};
