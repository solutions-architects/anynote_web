import { ElementsState } from "../services/state/notes/elementSlice"
import { Note, Folder } from "../types/elements"
import { capitalize, currentDateAsString } from "./helpers"

/**
 * Calculates a number for next folder's or note's name
 * Ex. if Untitled 1 and Untitled 2 names are taken, return 3
 */
export function calculateNextElementNumber(state: ElementsState, type: "note" | "folder"): number {
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

export function createNewElement(state: ElementsState, type: "note" | "folder"): Note | Folder {
    const nextNumber = calculateNextElementNumber(state, type)

    return {
        id: nextNumber,
        name: `${capitalize(type)} ${nextNumber}`,
        createdAt: currentDateAsString(),
        isOpen: false,
    }
}
