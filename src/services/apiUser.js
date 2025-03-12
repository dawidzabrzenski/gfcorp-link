import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getUser() {
  try {
    const token = await localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching user data", error);
  }
}

export async function getUsers() {
  try {
    const res = await axios.get(`${API_URL}/api/users`);

    return res.data;
  } catch (err) {
    console.error("Error fetching users data", err);
  }
}

export async function addUser({
  token,
  email,
  firstName,
  lastName,
  password,
  group,
}) {
  try {
    const res = await axios.post(
      `${API_URL}/api/user/add`,
      {
        email,
        firstName,
        lastName,
        password,
        group,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw error;
  }
}

export async function editUser({
  token,
  id,
  email,
  firstName,
  lastName,
  password,
  group,
}) {
  try {
    const res = await axios.put(
      `${API_URL}/api/user/edit`,
      {
        id,
        email,
        firstName,
        lastName,
        password,
        group,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw error;
  }
}

export const deleteUser = async ({ token, id }) => {
  try {
    const res = await axios.delete(`${API_URL}/api/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
