// src/redux/slices/noteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {
    setNotes: (s, a) => { s.notes = a.payload; },
    addNote: (s, a) => { s.notes.push(a.payload); },
    removeNote: (s, a) => { s.notes = s.notes.filter(n => n.id !== a.payload); },
    setLoading: (s, a) => { s.loading = a.payload; },
    setError: (s, a) => { s.error = a.payload; },
  },
});

export const { setNotes, addNote, removeNote, setLoading, setError } = noteSlice.actions;
export default noteSlice.reducer;
