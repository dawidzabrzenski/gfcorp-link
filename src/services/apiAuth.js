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

export async function getAuthStatus() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const res = await axios.get("http://localhost:5000/api/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Authenticated token");
    return true;
  } catch (error) {
    console.error(
      "Auth error:",
      error?.response?.data?.message || error.message,
    );
    localStorage.removeItem("token");
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

    console.log(res.data);
    const { user } = res.data;
    return res.data;
  } catch (error) {
    console.error("Error fetching user data", error);
  }
}
