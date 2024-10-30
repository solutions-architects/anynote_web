import { configureStore } from "@reduxjs/toolkit"
import folderReducer from "./slices/folderSlice"
import noteReducer from "./slices/noteSlice"
import modalReducer from "./slices/modalSlice.ts"

export const store = configureStore({
    reducer: {
        notes: noteReducer,
        folders: folderReducer,
        modals: modalReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
