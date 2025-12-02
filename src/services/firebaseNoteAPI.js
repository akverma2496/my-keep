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
  const timestamp = getFormattedTimestamp();
  const newNote = {
    ...note,
    createdAt: timestamp,
    updatedAt: timestamp, // Same as createdAt on creation
    color: note.color || "#FFFFFF", // Default color
  };
  const res = await axios.post(
    `${DB_URL}/${userId}/categories/${categoryId}/notes.json?auth=${idToken}`,
    newNote
  );
  return { id: res.data.name, ...newNote };
};

// Update note
export const updateNoteAPI = async (idToken, userId, categoryId, noteId, updatedData) => {
  const timestamp = getFormattedTimestamp();
  const updatedNote = {
    ...updatedData,
    updatedAt: timestamp,
  };
  await axios.patch(
    `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`,
    updatedNote
  );
  // Return only the fields that were updated (including the new updatedAt)
  return { id: noteId, ...updatedNote };
};

// Delete note
export const deleteNoteAPI = async (idToken, userId, categoryId, noteId) => {
  await axios.delete(
    `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`
  );
};


export const archiveNoteAPI = async (idToken, userId, categoryId, noteId) => {
  await axios.patch(
    `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`,
    { isArchived: true }
  );
  return { id: noteId, isArchived: true };
};

// Unarchive note
export const unarchiveNoteAPI = async (idToken, userId, categoryId, noteId) => {
  await axios.patch(
    `${DB_URL}/${userId}/categories/${categoryId}/notes/${noteId}.json?auth=${idToken}`,
    { isArchived: false }
  );
  return { id: noteId, isArchived: false };
};