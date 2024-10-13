import "./note.scss"
import { Note as NoteType } from "../../../types/notes"
import { DocumentIcon, FolderIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

interface Props {
    note: NoteType,
}

export default function Note({ note }: Props) {
    return (
        <div 
        className={`note`}
        >
            <div className="note__icons">
                { 
                    note.type === "note"
                    ? <DocumentIcon className="note__icon"/> 
                    : (
                        <>
                            <ChevronRightIcon className="note__icon note__icon--arrow" />
                            <FolderIcon className="note__icon" />
                        </>
                    )  
                }
            </div>
            <div className="note__name">
                { note.name }
            </div>
        </div>
    )
}
