import { Folder, Note } from "../../types/elements.ts"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../state/store.ts"
import { setParentFolderForFolder } from "../state/slices/folderSlice"
import { setParentFolderForNote } from "../state/slices/noteSlice"
import { getNoteParentFolder, isInside, isNote } from "../../utils/elements"


const useDragAndDrop = (element: Folder | Note) => {
    const dispatch = useDispatch<AppDispatch>()
    const folders = useSelector((state: RootState) => state.folders.folders)

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("element", JSON.stringify(element))
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const draggedElement: Folder | Note = JSON.parse(e.dataTransfer.getData("element"))
        const isDraggedNote = isNote(draggedElement)
        const isSelfNote = isNote(element)
        let action = {
            id: draggedElement.id,
            newParentFolderId: element.parentFolderId
        }

        if (isSelfNote) {
            if (!element.parentFolderId) {
                return
            }

            if (isDraggedNote && draggedElement.id === element.id) {
                return
            }

            const noteParentFolder = getNoteParentFolder(folders, element)!

            if (draggedElement.id == noteParentFolder.id) {
                return
            }
            
            if (!isDraggedNote && isInside(folders, draggedElement, noteParentFolder)) {
                return
            }
        }

        if (!isSelfNote) {
            if (!isDraggedNote && draggedElement.id === element.id) {
                return
            }

            if (isInside(folders, draggedElement, element)) {
                return
            }

            action = {
                id: draggedElement.id,
                newParentFolderId: element.id,
            }
        }

        if (isDraggedNote) {
            dispatch(setParentFolderForNote(action))
        } else {
            dispatch(setParentFolderForFolder(action))
        }
    }

    return {
        onDragStart,
        onDragOver,
        onDrop
    }
}

export default useDragAndDrop
