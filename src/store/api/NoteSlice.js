import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axios.get("http://localhost:9000/notes");
  return response.data;
});

export const addNote = createAsyncThunk("notes/addNote", async (newNote) => {
  const response = await axios.post(
    "http://localhost:9000/create_note",
    newNote
  );
  return response.data;
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
   await axios.delete(`http://localhost:9000/delete_note/${id}`);
  return id;
});

export const editNote = createAsyncThunk("notes/editNote", async ({id, updatedNote}) => {
   const response = await axios.put(`http://localhost:9000/update_note/${id}`, updatedNote);
   return response.data;
 });


const NoteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.notes = action.payload);
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })

      .addCase(deleteNote.fulfilled, (state, action) => {
        const noteId = action.payload
        state.notes = state.notes.filter(note => note.id !== noteId)
      })

      .addCase(editNote.fulfilled, (state,action) => {
        const {id, updatedNote} = action.payload;
        const existingNote = state.notes.find((note) => note.id === id);
        if (existingNote) {
            existingNote.title = updatedNote.title;
            existingNote.content = updatedNote.content;
        }
      })
  },
});

export default NoteSlice.reducer;
