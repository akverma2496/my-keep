import axios from "axios";
import {
  setNotes,
  addNote,
  removeNote,
  //updateNote as updateNoteSlice,
  setLoading,
  setError,
} from "../slices/noteSlice";

const DB_URL = import.meta.env.VITE_DB_URL;

// ✅ Fetch Notes for a Category
export const fetchNotes = (idToken, userId, categoryId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get(
      `${DB_URL}/${userId}/categories/${categoryId}/notes.json?auth=${idToken}`
    );
    const data = res.data
      ? Object.keys(res.data).map((key) => ({ id: key, ...res.data[key] }))
      : [];
    dispatch(setNotes(data));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Add New Note
export const createNote =
  (idToken, userId, categoryId, note) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${DB_URL}/${userId}/categories/${categoryId}/notes.json?auth=${idToken}`,
        note
      );
      dispatch(addNote({ id: res.data.name, ...note }));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

// ✅ Update Note
export const updateNote =
  (idToken, userId, categoryId, noteId, updatedData) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axios.patch(
        `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`,
        updatedData
      );
      dispatch(updateNoteSlice({ id: noteId, ...updatedData }));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

// ✅ Delete Note
export const deleteNote =
  (idToken, userId, categoryId, noteId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(
        `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`
      );
      dispatch(removeNote(noteId));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
