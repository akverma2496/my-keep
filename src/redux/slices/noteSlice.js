import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {
    setNotes: (s, a) => {
      s.notes = a.payload;
    },
    addNote: (s, a) => {
      s.notes.push(a.payload);
    },
    removeNote: (s, a) => {
      s.notes = s.notes.filter((n) => n.id !== a.payload);
    },
    updateNote: (s, a) => {
      const updated = a.payload;
      const idx = s.notes.findIndex((n) => n.id === updated.id);
      if (idx !== -1) s.notes[idx] = { ...s.notes[idx], ...updated };
    },
    setLoading: (s, a) => {
      s.loading = a.payload;
    },
    setError: (s, a) => {
      s.error = a.payload;
    },
  },
});

export const { setNotes, addNote, removeNote, updateNote, setLoading, setError } =
  noteSlice.actions;
export default noteSlice.reducer;
