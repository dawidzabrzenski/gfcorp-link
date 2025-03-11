import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "../App";

const API_URL = import.meta.env.VITE_API_URL;

export async function login(email, password) {
  try {
    const res = await axios.post(`${API_URL}/api/login`, {
      email,
      password,
    });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      await queryClient.refetchQueries(["authStatus"]);
      // await new Promise((resolve) => setTimeout(resolve, 100));
    }

    queryClient.refetchQueries(["userData", "permissions"]);

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getAuthStatus() {
  const token = localStorage.getItem("token");

  console.log(token);

  if (!token) return false;

  try {
    const res = await axios.get(`${API_URL}/api/protected`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return true;
  } catch (error) {
    console.error(
      "Auth error:",
      error?.response?.data?.message || error.message,
    );
    localStorage.removeItem("token");
    toast.error("Sesja wygasła. Zaloguj się ponownie");
    return false;
  }
}

export async function logout() {
  try {
    await localStorage.removeItem("token");

    toast.success("Wylogowano Cię");
  } catch (error) {
    console.error("Error logging out", error);
  }
}
