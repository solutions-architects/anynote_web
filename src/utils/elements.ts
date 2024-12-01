import { Note, Folder } from "../types/elements"


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

export function getNoteParentFolder(folders: Folder[], note: Note): Folder | undefined {
    if (!note.parentFolderId) {
        return undefined
    }

    return folders[getElementIdxById(folders, note.parentFolderId!)]
}

export function getNestingLevel(folders: Folder[], parentFolderId?: number): number {
    let nestingLevel = 0
    let currentParentFolderId = parentFolderId

    while (currentParentFolderId) {
        const idx = getElementIdxById(folders, currentParentFolderId)
        currentParentFolderId = folders[idx].parentFolderId
        nestingLevel++
    }

    return nestingLevel
}

export function isInside(folders: Folder[], outerFolder: Folder, innerFolder: Folder): boolean {
    let currentParentFolderId = innerFolder.parentFolderId

    while (currentParentFolderId) {
        const idx = getElementIdxById(folders, currentParentFolderId)
    
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
