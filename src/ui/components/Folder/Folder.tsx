import "./folder.scss"
import Note from "../Note/Note"
import { setParentFolderAction } from "../../../types/actions"
import { Folder as FolderType, Note as NoteType } from "../../../types/elements"
import { FolderIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { AppDispatch, RootState } from "../../../services/state/store"
import { useSelector, useDispatch } from "react-redux"
import { setParentFolderForNote } from "../../../services/state/slices/noteSlice"
import { toggleOpen, setParentFolderForFolder } from "../../../services/state/slices/folderSlice"
import { getNestingLevel, isInside, isNote } from "../../../utils/elements"


interface Props {
    folder: FolderType,
    paddingLeftRem?: number,
}

export default function Folder({ folder, paddingLeftRem = 0 }: Props) {
    const notes = useSelector((state: RootState) => state.notes.notes)
    const folders = useSelector((state: RootState) => state.folders.folders)
    const dispatch = useDispatch<AppDispatch>()
    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("element", JSON.stringify(folder))
    }

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const draggedElement: FolderType | NoteType = JSON.parse(e.dataTransfer.getData("element"))
        const isElementNote = isNote(draggedElement)
        
        let action: setParentFolderAction = {
            id: draggedElement.id,
            newParentFolderId: folder.id,
        }

        if (!isElementNote && draggedElement.id === folder.id) {
            return
        }

        if (!isElementNote && isInside(folders, draggedElement, folder)) {
            return
        }


        if (isElementNote) {
            dispatch(setParentFolderForNote(action))
        } else {
            dispatch(setParentFolderForFolder(action))
        }

    }

    return (
        <>
            <div
            className={`folder`}
            onDragStart={handleOnDragStart}
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
            draggable
            onClick={() => dispatch(toggleOpen(folder.id))}
            style={{paddingLeft: `${paddingLeftRem + 0.5}rem`}}
            >
                <div className="folder__icons">
                    {
                        folder.isOpen ? (
                            <ChevronDownIcon className="folder__icon folder__icon--arrow" />
                        ) : (
                            <ChevronRightIcon className="folder__icon folder__icon--arrow" />
                        )
                    }
                    <FolderIcon className="folder__icon" />
                </div>
                <div className="folder__name">
                    { folder.name }
                </div>
            </div>
            {
                folder.isOpen ? (
                    <div 
                    className="folder-children"
                    >
                        {
                            folders.filter((f) => f.parentFolderId === folder.id).map((f) => {
                                return ( <Folder
                                    paddingLeftRem={getNestingLevel(folders, f.parentFolderId) * 1.62}
                                    folder={f}
                                    key={`folder ${f.id}`}
                                />)
                            })
                        }
                        {
                            notes.filter((note) => note.parentFolderId === folder.id).map((note) => (
                                <Note
                                paddingLeftRem={getNestingLevel(folders, note.parentFolderId) * 1.62}
                                note={note}
                                key={`note ${note.id}`}
                                />
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    )
}
