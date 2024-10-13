import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Note, Folder } from "../../../types/notes"
import { currentDateAsString } from "../../../utils/helpers"
import { calculateNextElementId, calculateNextElementNumber } from "../../../utils/notes"

export interface NotesState {
    currentFolder?: number,
    notes: Note[],
    folders: Folder[],
}

const initialState: NotesState = {
    currentFolder: undefined,
    notes: [],
    folders: [],
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNote: (state: NotesState) => {
            const newNote: Note = {
                id: calculateNextElementId(state),
                name: `Note ${calculateNextElementNumber(state, "note")}`,
                contents: "",
                createdAt: currentDateAsString(),
                parentFolderId: state.currentFolder as number,
            }

            state.notes.push(newNote)
        },
        deleteNote: (state: NotesState, action: PayloadAction<string>) => {
            state.notes.some((note, idx) => {
                if (note.name === action.payload) {
                    state.notes.splice(idx, 1)
                    return true;
                }
            })
        },
        createFolder: (state: NotesState) => {
            const newFolder: Folder = {
                id: calculateNextElementId(state),
                name: `Folder ${calculateNextElementNumber(state, "folder")}`,
                createdAt: currentDateAsString(),
                parentFolderId: state.currentFolder as number,
            }

            state.folders.push(newFolder)
        },
        deleteFolder: (state: NotesState, action: PayloadAction<string>) => {
            state.folders.some((folder, idx) => {
                if (folder.name === action.payload) {
                    state.folders.splice(idx, 1)
                    return true;
                }
            })
        },
    },
})

export const { createNote, deleteNote, createFolder, deleteFolder } = notesSlice.actions

export default notesSlice.reducer