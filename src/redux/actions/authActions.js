import { toast } from "react-toastify";
import { loginUser, signupUser } from "../../services/firebaseAuthAPI";
import { authStart, authSuccess, authFailure } from "../slices/authSlice";

export const signup = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch(authStart());
    const data = await signupUser(email, password);
    const user = { email: data.email, localId: data.localId };
    const token = data.idToken;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    dispatch(authSuccess({ user, token }));
    toast.success("Signup successful!");
    navigate("/categories");
  } catch (error) {
    dispatch(authFailure(error.response?.data?.error?.message || "Signup failed"));
    toast.error(error.response?.data?.error?.message || "Signup failed");
  }
};

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch(authStart());
    const data = await loginUser(email, password);
    const user = { email: data.email, localId: data.localId };
    const token = data.idToken;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    dispatch(authSuccess({ user, token }));
    toast.success("Login successful!");
    navigate("/categories");
  } catch (error) {
    dispatch(authFailure(error.response?.data?.error?.message || "Login failed"));
    toast.error(error.response?.data?.error?.message || "Login failed");
  }
};
