import { configureStore } from '@reduxjs/toolkit'
import NoteSlice from './api/NoteSlice'

export const store = configureStore({
    reducer: {
        notes: NoteSlice
    },
})