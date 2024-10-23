import { Folder, Note } from "./elements";

export interface NoteState {
    notes: Note[],
}

export interface FolderState {
    folders: Folder[],
}