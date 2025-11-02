// src/redux/actions/categoryActions.js
import axios from "axios";
import {
  setCategories,
  addCategory,
  removeCategory,
  setLoading,
  setError,
} from "../slices/categorySlice";

const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL; // e.g. https://your-project.firebaseio.com

// ✅ Get All Categories
export const fetchCategories = (idToken, userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get(`${DB_URL}/categories/${userId}.json?auth=${idToken}`);
    const data = res.data ? Object.keys(res.data).map((key) => ({ id: key, ...res.data[key] })) : [];
    dispatch(setCategories(data));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Add New Category
export const createCategory = (idToken, userId, name) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.post(`${DB_URL}/categories/${userId}.json?auth=${idToken}`, { name });
    dispatch(addCategory({ id: res.data.name, name }));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Delete Category
export const deleteCategory = (idToken, userId, id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`${DB_URL}/categories/${userId}/${id}.json?auth=${idToken}`);
    dispatch(removeCategory(id));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};
