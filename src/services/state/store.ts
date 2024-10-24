import { configureStore } from "@reduxjs/toolkit"
import folderReducer from "./slices/folderSlice"
import noteReducer from "./slices/noteSlice"


export const store = configureStore({
    reducer: {
        notes: noteReducer,
        folders: folderReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
