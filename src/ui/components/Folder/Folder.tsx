import "./folder.scss"
import Note from "../Note/Note"
import { Folder as FolderType } from "../../../types/elements"
import { FolderIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { AppDispatch, RootState } from "../../../services/state/store"
import { useSelector, useDispatch } from "react-redux"
import { toggleOpen } from "../../../services/state/slices/folderSlice"
import { getNestingLevel } from "../../../utils/elements"
import useDragAndDrop from "../../../services/hooks/useDragAndDrop"


interface Props {
    folder: FolderType,
    paddingLeftRem?: number,
}

export default function Folder({ folder, paddingLeftRem = 0 }: Props) {
    const notes = useSelector((state: RootState) => state.notes.notes)
    const folders = useSelector((state: RootState) => state.folders.folders)
    const dispatch = useDispatch<AppDispatch>()
    
    const { onDragStart, onDragOver, onDrop } = useDragAndDrop(folder)

    return (
        <>
            <div
            className={"folder"}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
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
