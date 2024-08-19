import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// SIGNUP
export const postSignup = async (walletAddress, email, referredBy) => {
  try {
    const res = await axios.post(BASE_URL + "/signUp", {
      walletAddress: walletAddress,
      email: email,
      referredBy: referredBy,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// OTP
export const postOTPVerify = async (email, otp) => {
  try {
    const res = await axios.post(BASE_URL + "/VerifyOtp", {
      email: email,
      otp: otp,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Login
export const postLogin = async (walletAddress) => {
  try {
    const res = await axios.post(BASE_URL + "/login", {
      walletAddress: walletAddress,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
