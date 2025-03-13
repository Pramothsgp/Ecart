import axios from "axios";
const API_URL = "http://localhost:8080";

const login = async (userdata: any) => {
  try {
    const res = await axios.get(
      `${API_URL}/auth/login` ,{
      params: {
        ...userdata
      },
      });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


  const register = async (userdata: any) => {
  try {
    const formData = new FormData();
    formData.append("username", userdata.username);
    formData.append("email", userdata.email);
    formData.append("password", userdata.password);
    formData.append("image", userdata.image);
    return await axios.post(`${API_URL}/auth/register`, formData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const sendOtp = async (email: string, otp: string) => {
  try {
    return await axios.post(`${API_URL}/api/mail/send-aligned-mail`, {
      to : email,
      subject : "OTP for verification",
      body : otp
    }); 
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export default {
  login,
  register,
  sendOtp,
};
