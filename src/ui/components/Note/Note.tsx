import "./note.scss"
import { Note as NoteType } from "../../../types/elements"
import { DocumentIcon } from "@heroicons/react/24/outline"

interface Props {
    note: NoteType,
}

export default function Note({ note }: Props) {

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("element", JSON.stringify(note))
    }

    return (
        <div
        className={`note`}
        onDragStart={(e) => handleOnDragStart(e)}
        draggable
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
