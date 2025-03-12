import axios from "axios";
const API_URL = "http://localhost:8080/auth";

const login = async (userdata: any) => {
  console.log(userdata);
  try {
    const res = await axios.get(
      `${API_URL}/login?username=${userdata.username}&password=${userdata.password}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  login,
};
