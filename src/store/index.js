import { configureStore } from "@reduxjs/toolkit";
import NoteSliceReducer from "./api/NoteSlice";

const store = configureStore({
    reducer: {
        note: NoteSliceReducer
    }
})

export default store