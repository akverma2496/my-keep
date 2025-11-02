import axios from "axios";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const BASE_URL = "https://identitytoolkit.googleapis.com/v1";

export const signupUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/accounts:signUp?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/accounts:signInWithPassword?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true,
  });
  return response.data;
};
