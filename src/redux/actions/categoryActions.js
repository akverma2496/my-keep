import { toast } from "react-toastify";
import {
  getCategories,
  addCategoryAPI,
  deleteCategoryAPI,
  updateCategoryAPI,
} from "../../services/firebaseCategoryAPI";
import {
  setCategories,
  addCategory,
  removeCategory,
  updateCategory,
  setLoading,
  setError,
} from "../slices/categorySlice";

export const fetchCategories = (idToken, userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await getCategories(idToken, userId);
    dispatch(setCategories(data));
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to load categories");
  } finally {
    dispatch(setLoading(false));
  }
};

export const createCategory = (idToken, userId, name) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const newCategory = await addCategoryAPI(idToken, userId, name);
    dispatch(addCategory(newCategory));
    toast.success("Category added!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to add category");
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteCategory = (idToken, userId, id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await deleteCategoryAPI(idToken, userId, id);
    dispatch(removeCategory(id));
    toast.info("Category deleted");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to delete category");
  } finally {
    dispatch(setLoading(false));
  }
};

export const editCategory = (idToken, userId, id, name) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const updated = await updateCategoryAPI(idToken, userId, id, name);
    dispatch(updateCategory(updated));
    toast.success("Category updated!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to update category");
  } finally {
    dispatch(setLoading(false));
  }
};
