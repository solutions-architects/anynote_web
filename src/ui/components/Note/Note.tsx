import "./note.scss"
import { Note as NoteType } from "../../../types/elements"
import { DocumentIcon } from "@heroicons/react/24/outline"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../services/state/store"
import { useNavigate } from "react-router-dom";
import { setCurrentNote } from "../../../services/state/slices/currentNoteSlice.ts";
import useDragAndDrop from "../../../services/hooks/useDragAndDrop.ts"

interface Props {
    note: NoteType,
    paddingLeftRem?: number,
}

export default function Note({ note, paddingLeftRem = 0 }: Props) {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { onDragStart, onDragOver, onDrop } = useDragAndDrop(note)

    const handleNoteClick = () => {
        dispatch(setCurrentNote(note))
        navigate(`/workspace/${note.id}`)
    }

    return (
        <div
        className={"note"}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
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
