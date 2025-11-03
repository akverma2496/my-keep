import axios from "axios";

const DB_URL = import.meta.env.VITE_DB_URL;

// ✅ Get all notes for a category
export const getNotes = async (idToken, userId, categoryId) => {
  const res = await axios.get(
    `${DB_URL}/${userId}/categories/${categoryId}/notes.json?auth=${idToken}`
  );
  return res.data
    ? Object.keys(res.data).map((key) => ({ id: key, ...res.data[key] }))
    : [];
};

// ✅ Add a new note
export const addNoteAPI = async (idToken, userId, categoryId, note) => {
  const res = await axios.post(
    `${DB_URL}/${userId}/categories/${categoryId}/notes.json?auth=${idToken}`,
    note
  );
  return { id: res.data.name, ...note };
};

// ✅ Update note
export const updateNoteAPI = async (idToken, userId, categoryId, noteId, updatedData) => {
  await axios.patch(
    `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`,
    updatedData
  );
  return { id: noteId, ...updatedData };
};

// ✅ Delete note
export const deleteNoteAPI = async (idToken, userId, categoryId, noteId) => {
  await axios.delete(
    `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`
  );
};
