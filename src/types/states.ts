import { Folder, Note } from "./elements";

export interface NoteState {
    notes: Note[],
}

export interface FolderState {
    folders: Folder[],
}

export interface ModalState {
    [modalId: string]: boolean;
}