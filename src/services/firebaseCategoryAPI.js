import axios from "axios";

const DB_URL = import.meta.env.VITE_DB_URL;

// Get all categories
export const getCategories = async (idToken, userId) => {
  const res = await axios.get(`${DB_URL}/${userId}/categories.json?auth=${idToken}`);
  return res.data
    ? Object.keys(res.data).map((key) => ({ id: key, ...res.data[key] }))
    : [];
};

// Add new category
export const addCategoryAPI = async (idToken, userId, name) => {
  const res = await axios.post(`${DB_URL}/${userId}/categories.json?auth=${idToken}`, { name });
  return { id: res.data.name, name };
};

// Delete category
export const deleteCategoryAPI = async (idToken, userId, id) => {
  await axios.delete(`${DB_URL}/${userId}/categories/${id}.json?auth=${idToken}`);
};

// Update category
export const updateCategoryAPI = async (idToken, userId, id, name) => {
  await axios.patch(`${DB_URL}/${userId}/categories/${id}.json?auth=${idToken}`, { name });
  return { id, name };
};
