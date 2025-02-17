import axios from "axios";

export async function login(email, password) {
  try {
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    if (res.data.token) {
      await localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function authStatus() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const res = await axios.get("http://localhost:5000/api/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return true;
  } catch (error) {
    localStorage.removeItem("token");
    console.error(
      "Auth error:",
      error?.response?.data?.message || error.message,
    );
    return false;
  }
}

export async function getUser(token) {
  try {
    const res = await axios.get("http://localhost:5000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { user } = res.data;
    return user;
  } catch (error) {
    console.error("Error fetching user data", error);
  }
}
