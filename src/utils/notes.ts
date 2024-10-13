import { NotesState } from "../services/state/notes/notesSlice"
import { Note, Folder } from "../types/notes"
import { capitalize } from "./helpers"

/**
 * Calculates a number for next folder's or note's name
 * 
 * Ex. if Untitled 1 and Untitled 2 names are taken, return 3
 */
export function calculateNextElementNumber(state: NotesState, type: "note" | "folder"): number {
    let elements: Note[] | Folder[] = state.notes

    if (type === "folder") {
        elements = state.folders
    }

    let max = 0
    elements.forEach((element) => {
        if (element.name.startsWith(capitalize(type))) {
            const matches = element.name.match(/\d+$/);

            if (matches) {
                const currentNumber = Number(matches[0])
                if (currentNumber > max) {
                    max = currentNumber
                }
            }
        }
    })

    return max + 1
}

export function calculateNextElementId(state: NotesState): number {
    return state.folders.length + state.notes.length + 1;
}

export function isNote(element: Folder | Note): element is Note {
    return (<Note>element).contents !== undefined;
}
