import axios from "axios";

const DB_URL = import.meta.env.VITE_DB_URL;

const getFormattedTimestamp = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const date = now.toLocaleDateString("en-GB").replace(/\//g, "-");
  return `${time} | ${date}`;
};

// Get all notes for a category
export const getNotes = async (idToken, userId, categoryId) => {
  const res = await axios.get(
    `${DB_URL}/${userId}/categories/${categoryId}/notes.json?auth=${idToken}`
  );
  return res.data
    ? Object.keys(res.data).map((key) => ({ id: key, ...res.data[key] }))
    : [];
};

// Add a new note
export const addNoteAPI = async (idToken, userId, categoryId, note) => {
  const newNote = {
    ...note,
    createdAt: getFormattedTimestamp(),
    updatedAt: getFormattedTimestamp(),
  };

  const res = await axios.post(
    `${DB_URL}/${userId}/categories/${categoryId}/notes.json?auth=${idToken}`,
    newNote
  );

  return { id: res.data.name, ...newNote };
};

// Update note
export const updateNoteAPI = async (idToken, userId, categoryId, noteId, updatedData) => {
  const updatedNote = {
    ...updatedData,
    updatedAt: getFormattedTimestamp(),
  };

  await axios.patch(
    `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`,
    updatedNote
  );

  return { id: noteId, ...updatedNote };
};

// Delete note
export const deleteNoteAPI = async (idToken, userId, categoryId, noteId) => {
  await axios.delete(
    `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`
  );
};
