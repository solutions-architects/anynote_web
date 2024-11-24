import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getElementIdxById } from "../../../utils/elements"
import { currentDateAsString } from "../../../utils/helpers"
import { setParentFolderAction } from "../../../types/actions"
import { NoteState } from "../../../types/states"
import {Descendant} from "slate";

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
                contents: [{
                    type: "paragraph",
                    children: [{ text: "" }],
                }],
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
        updateContents: (state: NoteState, action: PayloadAction<{ id: number; contents: Descendant[] }>) => {
            const { id, contents } = action.payload;
            const idx = getElementIdxById(state.notes, id);
            if (idx !== -1) {
                state.notes[idx].contents = contents;
            }
            },
    },
})

export const { create: createNote, remove: removeNote, setParentFolder: setParentFolderForNote, updateContents } = noteSlice.actions

export default noteSlice.reducer