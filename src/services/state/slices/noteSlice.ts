import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getElementIdxById } from "../../../utils/elements"
import { currentDateAsString } from "../../../utils/helpers"
import { setParentFolderAction } from "../../../types/actions"
import { NoteState } from "../../../types/states"

const initialState: NoteState = {
    notes: [],
}

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        create: (state: NoteState) => {
            state.notes.push({
                id: state.notes.length + 1,
                name: `Note ${state.notes.length + 1}`,
                createdAt: currentDateAsString(),
                contents: "",
                isOpen: false,
            })
        },
        remove: (state: NoteState, action: PayloadAction<number>) => {
            const idx = getElementIdxById(state.notes, action.payload)
            if (idx !== -1) {
                state.notes.splice(idx, 1)
            }
        },
        setParentFolder: (state: NoteState, action: PayloadAction<setParentFolderAction>) => {
            const { id, newParentFolderId } = action.payload
            const idx = getElementIdxById(state.notes, id)
            if (idx !== -1) {
                const note = state.notes[idx]
                note.parentFolderId = newParentFolderId
                state.notes.splice(idx, 1, note)
            }
        },
    },
})

export const { create: createNote, remove: removeNote, setParentFolder: setParentFolderForNote } = noteSlice.actions

export default noteSlice.reducer