import "./note-element.scss"
import { Note, Folder } from "../../../types/notes"
import { isNote } from "../../../utils/notes"
import { DocumentIcon, FolderIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

interface Props {
    element: Note | Folder,
    isOpen?: boolean;
}

export default function NoteElement({ element, isOpen = false }: Props) {
    return (
        <div className="note-element">
            <div className="note-element__icons">
                { 
                    isNote(element) 
                    ? <DocumentIcon className="note-element__icon"/> 
                    : (
                        <>
                            <ChevronRightIcon className="note-element__icon note-element__icon--arrow" />
                            <FolderIcon className="note-element__icon" />
                        </>
                    )  
                }
            </div>
            <div className="note-element__name">
                { element.name }
            </div>
        </div>
    )
}
