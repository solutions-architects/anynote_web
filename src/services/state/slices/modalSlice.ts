import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {ModalState} from "../../../types/states.ts";


const initialState: ModalState = {}

const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        open: (state: ModalState, action: PayloadAction<string>) => {
            state[action.payload] = true;
        },
        close: (state: ModalState, action: PayloadAction<string>) => {
            state[action.payload] = false;
        }
    }
})

export const {open: openModal, close: closeModal} = ModalSlice.actions
export default ModalSlice.reducer