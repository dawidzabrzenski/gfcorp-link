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
