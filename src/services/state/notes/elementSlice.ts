import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Note, Folder } from "../../../types/elements"
import { createNewElement } from "../../../utils/notes"

export interface ElementsState {
    notes: Note[],
    folders: Folder[],
}

const initialState: ElementsState = {
    notes: [],
    folders: [],
}

const elementsSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNote: (state: ElementsState) => {
            state.notes.push(createNewElement(state, "note"))
        },
        createFolder: (state: ElementsState) => {
            state.folders.push(createNewElement(state, "folder"))
        },
        deleteNote: (state: ElementsState, action: PayloadAction<string>) => {
            state.notes.some((note, idx) => {
                if (note.name === action.payload) {
                    state.notes.splice(idx, 1)
                    return true;
                }
            })
        },
        deleteFolder: (state: ElementsState, action: PayloadAction<string>) => {
            state.folders.some((folder, idx) => {
                if (folder.name === action.payload) {
                    state.folders.splice(idx, 1)
                    return true;
                }
            })
        },
    },
})

export const { createNote, deleteNote, createFolder, deleteFolder } = elementsSlice.actions

export default elementsSlice.reducer