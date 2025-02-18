import axios from "axios";

export async function getUser() {
  try {
    const token = await localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/user", {
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
    const res = await axios.get("http://localhost:5000/api/users");

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Error fetching users data", err);
  }
}
