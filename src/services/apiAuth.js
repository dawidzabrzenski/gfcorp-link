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
