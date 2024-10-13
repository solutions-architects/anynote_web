import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Note } from "../../../types/notes"
import { currentDateAsString, capitalize } from "../../../utils/helpers"

export interface NotesState {
    notes: Note[],
    nextNoteId: number,
}

const initialState: NotesState = {
    notes: [],
    nextNoteId: 0,
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNote: (state: NotesState, action: PayloadAction<"note" | "folder">) => {
            state.notes.push({
                id: state.nextNoteId,
                name: `${capitalize(action.payload)} ${state.nextNoteId}`,
                contents: "",
                createdAt: currentDateAsString(),
                parentFolderId: undefined,
                type: action.payload,
                isOpen: false,
            })
            state.nextNoteId++;
        },
        deleteNote: (state: NotesState, action: PayloadAction<number>) => {
            state.notes.some((note, idx) => {
                if (note.id === action.payload) {
                    state.notes.splice(idx, 1)
                    return true;
                }
            })
        },
    },
})

export const { createNote, deleteNote } = notesSlice.actions

export default notesSlice.reducer