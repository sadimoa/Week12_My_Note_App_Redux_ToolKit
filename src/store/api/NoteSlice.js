import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    notes: [],
    error: null,
    status: 'idle'
}

// fetch notes
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const response = await axios.get('http://localhost:9000/notes')
    return response.data
})

// add note
export const addNotes = createAsyncThunk('note/addNotes', async (newNote) => {
    const response = await axios.post('http://localhost:9000/create_note', newNote)
    return response.data
})

// edit note
export const editNote = createAsyncThunk('note/editNote', async ({noteId,updatedNote}) => {
    const response = await axios.put(`http://localhost:9000/update_note/${noteId}` ,updatedNote)
    return response.data
})

// delete note
export const deleteNote = createAsyncThunk('note/deleteNote', async (id) => {
     await axios.delete(`http://localhost:9000/delete_note/${id}`)
    return id
})




const NoteSlce = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
       builder.addCase(fetchNotes.pending, (state) => {
           state.notes = []
           state.status =  'loading'
           state.error = null
       })
       .addCase(fetchNotes.fulfilled, (state,action) => {
        state.notes = action.payload
        state.status =  'succeeded'
    })
    .addCase(fetchNotes.rejected, (state,action) => {
        state.status =  'failed'
        state.error = action.error
    })

    .addCase(addNotes.fulfilled, (state,action) => {
        state.notes.push(action.payload)
    })

    .addCase(editNote.fulfilled, (state,action) => {
      const { id, title, content } = action.payload
      const existingNote =  state.notes.find(note => note.id === Number(id))
      if(existingNote){
        existingNote.title = title
        existingNote.content = content
      }
    })
    .addCase(deleteNote.fulfilled, (state,action) => {
     const noteId = action.payload
     state.notes =  state.notes.filter(note => note.id !== noteId)
    })
    }

})

export default NoteSlce.reducer