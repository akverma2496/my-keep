import { toast } from "react-toastify";

import {
  getNotes,
  addNoteAPI,
  updateNoteAPI,
  deleteNoteAPI,
  archiveNoteAPI,
  unarchiveNoteAPI,
} from "../../services/firebaseNoteAPI";
import {
  setNotes,
  addNote,
  removeNote,
  updateNote,
  setLoading,
  setError,
  archiveNote,
  unarchiveNote,
} from "../slices/noteSlice";

const BASE_URL = import.meta.env.VITE_FIREBASE_URL;

export const fetchNotes = (idToken, userId, categoryId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await getNotes(idToken, userId, categoryId);
    dispatch(setNotes(data));
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to load notes");
  } finally {
    dispatch(setLoading(false));
  }
};

export const createNote = (idToken, userId, categoryId, note) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const newNote = await addNoteAPI(idToken, userId, categoryId, note);
    dispatch(addNote(newNote));
    toast.success("Note added!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to add note");
  } finally {
    dispatch(setLoading(false));
  }
};

export const editNote =
  (idToken, userId, categoryId, noteId, updatedData) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const updated = await updateNoteAPI(idToken, userId, categoryId, noteId, updatedData);
      dispatch(updateNote(updated));
      toast.success("Note updated!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to update note");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteNote =
  (idToken, userId, categoryId, noteId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await deleteNoteAPI(idToken, userId, categoryId, noteId);
      dispatch(removeNote(noteId));
      toast.info("Note deleted");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to delete note");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const changeNoteColor =
  (idToken, userId, categoryId, noteId, color) => async (dispatch) => {
    try {
      // Optimistically update the UI first for better UX
      dispatch(updateNote({ id: noteId, color }));
      
      // Persist to Firebase
      await updateNoteAPI(idToken, userId, categoryId, noteId, { color });
      
      toast.success("Color updated!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to update color");
    }
  };

  export const archiveNoteAsync =
  (idToken, userId, categoryId, noteId) => async (dispatch) => {
    try {
      console.log("Archiving note:", idToken, userId, categoryId, noteId);
      dispatch(setLoading(true));
      
      const archivedNote = await archiveNoteAPI(idToken, userId, categoryId, noteId);
      dispatch(archiveNote(noteId));
      
      toast.info("Note archived");
    } catch (err) {
      console.error("Archive error:", err);
      dispatch(setError(err.message));
      toast.error("Failed to archive note");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const unarchiveNoteAsync =
  (idToken, userId, categoryId, noteId) => async (dispatch) => {
    try {
      console.log("Unarchiving note:", idToken, userId, categoryId, noteId);
      dispatch(setLoading(true));

      const restoredNote = await unarchiveNoteAPI(idToken, userId, categoryId, noteId);
      dispatch(unarchiveNote(noteId));

      toast.info("Note restored"); // same style as archiveNoteAsync
    } catch (err) {
      console.error("Unarchive error:", err);
      dispatch(setError(err.message));
      toast.error("Failed to unarchive note");
    } finally {
      dispatch(setLoading(false));
    }
  };
