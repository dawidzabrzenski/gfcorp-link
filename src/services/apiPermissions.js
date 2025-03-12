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

export const addGroup = async ({ token, name, visibleName, permissions }) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/groups/add`,
      {
        name,
        visibleName,
        permissions,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const editGroup = async ({
  token,
  id,
  name,
  visibleName,
  permissions,
}) => {
  try {
    const res = await axios.put(
      `${API_URL}/api/groups/edit`,
      {
        id,
        name,
        visibleName,
        permissions,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGroup = async ({ token, id }) => {
  try {
    const res = await axios.delete(`${API_URL}/api/groups/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
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
