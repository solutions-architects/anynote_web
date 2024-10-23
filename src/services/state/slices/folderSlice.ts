import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getElementIdxById  } from "../../../utils/elements"
import { currentDateAsString } from "../../../utils/helpers"
import { setParentFolderAction } from "../../../types/actions"
import { FolderState } from "../../../types/states"

const initialState: FolderState = {
    folders: [],
}

const folderSlice = createSlice({
    name: "folder",
    initialState,
    reducers: {
        create: (state: FolderState) => {
            state.folders.push({
                id: state.folders.length + 1,
                name: `Folder ${state.folders.length + 1}`,
                isOpen: false,
                createdAt: currentDateAsString(),
            })
        },
        remove: (state: FolderState, action: PayloadAction<number>) => {
            const idx = getElementIdxById(state.folders, action.payload)
            if (idx !== -1) {
                state.folders.splice(idx, 1)
            }
        },
        setParentFolder: (state: FolderState, action: PayloadAction<setParentFolderAction>) => {
            const { id, newParentFolderId } = action.payload
            const idx = getElementIdxById(state.folders, id)
            if (idx !== -1) {
                const folder = state.folders[idx]
                folder.parentFolderId = newParentFolderId
                state.folders.splice(idx, 1, folder)
            }
        },
        toggleOpen: (state: FolderState, action: PayloadAction<number>) => {
            const idx = getElementIdxById(state.folders, action.payload)
            if (idx !== -1) {
                const folder = state.folders[idx]
                folder.isOpen = !folder.isOpen
                state.folders.splice(idx, 1, folder)
            }
        }
    },
})

export const { create: createFolder, remove: removeFolder, setParentFolder: setParentFolderForFolder, toggleOpen } = folderSlice.actions

export default folderSlice.reducer