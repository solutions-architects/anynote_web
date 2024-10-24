import { Note, Folder } from "../types/elements"
import { capitalize, currentDateAsString } from "./helpers"
import { NoteState, FolderState } from "../types/states"

export function getElementIdxById(elements: Note[] | Folder[], id: number): number {
    let foundIdx = -1

    elements.some((el, idx) => {
        if (el.id === id) {
            foundIdx = idx
            return true
        }
    })

    return foundIdx
}

export function getNestingLevel(folders: Folder[], parentFolderId?: number): number {
    let nestingLevel = 0
    let currentParentFolderId = parentFolderId

    while (currentParentFolderId) {
        let idx = getElementIdxById(folders, currentParentFolderId)
        currentParentFolderId = folders[idx].parentFolderId
        nestingLevel++
    }

    return nestingLevel
}

export function isInside(folders: Folder[], outerFolder: Folder, innerFolder: Folder): boolean {
    let currentParentFolderId = innerFolder.parentFolderId

    while (currentParentFolderId) {
        let idx = getElementIdxById(folders, currentParentFolderId)
    
        if (folders[idx].id === outerFolder.id) {
            return true;
        }

        currentParentFolderId = folders[idx].parentFolderId
    }

    return false
}

export function isNote(element: Note | Folder): element is Note {
    return (<Note>element).contents !== undefined
}
