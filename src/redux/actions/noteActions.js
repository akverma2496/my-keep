import { toast } from "react-toastify";
import {
  getNotes,
  addNoteAPI,
  updateNoteAPI,
  deleteNoteAPI,
} from "../../services/firebaseNoteAPI";
import {
  setNotes,
  addNote,
  removeNote,
  updateNote,
  setLoading,
  setError,
} from "../slices/noteSlice";

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
