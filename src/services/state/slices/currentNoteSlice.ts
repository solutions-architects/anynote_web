import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../../types/elements.ts";

type CurrentNoteState = {
    note: Note | null;
};

const initialState: CurrentNoteState = {
    note: null,
};

const currentNoteSlice = createSlice({
    name: "currentNote",
    initialState,
    reducers: {
        setCurrentNote: (state, action: PayloadAction<Note>) => {
            state.note = action.payload;
        },
    },
});

export const { setCurrentNote} = currentNoteSlice.actions;

export default currentNoteSlice.reducer;
