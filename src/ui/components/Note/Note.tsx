import "./note.scss"
import { Folder as FolderType, Note as NoteType } from "../../../types/elements"
import { DocumentIcon } from "@heroicons/react/24/outline"
import { isNote } from "../../../utils/elements"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../services/state/store"
import { setParentFolderForNote } from "../../../services/state/slices/noteSlice"
import { setParentFolderForFolder } from "../../../services/state/slices/folderSlice"
import { useNavigate } from "react-router-dom";
import { setCurrentNote } from "../../../services/state/slices/currentNoteSlice.ts";

interface Props {
    note: NoteType,
    paddingLeftRem?: number,
}

export default function Note({ note, paddingLeftRem = 0 }: Props) {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("element", JSON.stringify(note))
    }

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const draggedElement: FolderType | NoteType = JSON.parse(e.dataTransfer.getData("element"))

        if (isNote(draggedElement) && draggedElement.id === note.id) {
            return
        }

        const action = {
            id: draggedElement.id,
            newParentFolderId: note.parentFolderId
        }

        if (isNote(draggedElement)) {
            dispatch(setParentFolderForNote(action))
        } else {
            dispatch(setParentFolderForFolder(action))
        }

    }
    const handleNoteClick = () => {
        dispatch(setCurrentNote(note))
        navigate(`/workspace/${note.id}`)
    }

    return (
        <div
        className={"note"}
        onDragStart={handleOnDragStart}
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
        onClick={handleNoteClick}
        draggable
        style={{paddingLeft: `${paddingLeftRem + 0.5}rem`}}
        >
            <div className="note__icons">
                <DocumentIcon className="note__icon"/> 
            </div>
            <div className="note__name">
                { note.name }
            </div>
        </div>
    )
}
