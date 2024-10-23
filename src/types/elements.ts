export type Folder = {
    id: number,
    name: string,
    createdAt: string,
    editedAt?: string,
    isOpen: boolean,
    parentFolderId?: number,
}

export type Note = {
    id: number,
    name: string,
    createdAt: string,
    editedAt?: string,
    isOpen: boolean,
    parentFolderId?: number,
    contents?: string,
}
