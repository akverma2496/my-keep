// src/redux/actions/noteActions.js
import axios from "axios";
import { setNotes, addNote, removeNote, setLoading, setError } from "../slices/noteSlice";

const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

// Fetch all notes under a category
export const fetchNotes = (idToken, userId, categoryId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get(`${DB_URL}/notes/${userId}/${categoryId}.json?auth=${idToken}`);
    const data = res.data ? Object.keys(res.data).map(k => ({ id: k, ...res.data[k] })) : [];
    dispatch(setNotes(data));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Create a note
export const createNote = (idToken, userId, categoryId, note) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.post(`${DB_URL}/notes/${userId}/${categoryId}.json?auth=${idToken}`, note);
    dispatch(addNote({ id: res.data.name, ...note }));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete a note
export const deleteNote = (idToken, userId, categoryId, noteId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`${DB_URL}/notes/${userId}/${categoryId}/${noteId}.json?auth=${idToken}`);
    dispatch(removeNote(noteId));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};
