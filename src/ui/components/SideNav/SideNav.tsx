import "./side-nav.scss"
import Logo from "../Logo/Logo"
import IconButton from "../IconButton/IconButton"
import Note from "../Note/Note"
import Folder from "../Folder/Folder"
import { AppDispatch, RootState } from "../../../services/state/store"
import { useSelector, useDispatch } from "react-redux"
import { createNote } from "../../../services/state/slices/noteSlice"
import { createFolder } from "../../../services/state/slices/folderSlice"
import { Folder as FolderType, Note as NoteType } from "../../../types/elements"
import { isNote } from "../../../utils/elements"
import { setParentFolderForFolder } from "../../../services/state/slices/folderSlice"
import { setParentFolderForNote } from "../../../services/state/slices/noteSlice"

export default function SideNav() {
    const notes = useSelector((state: RootState) => state.notes.notes)
    const folders = useSelector((state: RootState) => state.folders.folders)
    const dispatch = useDispatch<AppDispatch>()

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const draggedElement: FolderType | NoteType = JSON.parse(
            e.dataTransfer.getData("element")
        )

        const action = {
            id: draggedElement.id,
            newParentFolderId: undefined,
        }

        if (isNote(draggedElement)) {
            dispatch(setParentFolderForNote(action))
        } else {
            dispatch(setParentFolderForFolder(action))
        }

    }

    return (
        <nav className="side-nav">
            <div className="side-nav__top-nav">
                <div className="side-nav__logo">
                    <Logo linkTo="/workspace"/>
                </div>
                <div className="side-nav__top-icons">
                    <IconButton
                    icon="profile"
                    linkTo="profile"
                    />
                </div>
            </div>
            <div className="side-nav__workspace-nav">
                <div className="side-nav__workspace-side">
                    <IconButton
                    icon="add_note"
                    onClick={() => dispatch(createNote())}
                    />
                    <IconButton
                    icon="add_folder"
                    onClick={() => dispatch(createFolder())}
                    />
                    <IconButton
                    icon="sort"
                    />
                </div>
                <div className="side-nav__workspace-side">
                    <IconButton
                    icon="search"
                    />
                </div>
            </div>
            <div className="side-nav__notes">
                {
                    folders.filter((folder) => !folder.parentFolderId).map((folder) => (
                        <Folder 
                        key={folder.id}
                        folder={folder}
                        />
                    ))
                }
                {
                    notes.filter((note) => !note.parentFolderId).map((note) => (
                        <Note 
                        key={note.id}
                        note={note}
                        />
                    ))
                }
            </div>
            <div className="side-nav__drop-area"
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
            />
        </nav>
    )
}
