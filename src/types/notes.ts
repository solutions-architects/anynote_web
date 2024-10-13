export type Note = Folder & {
    contents?: string,
}

export type Folder = {
    id: number,
    name: string,
    parentFolderId: number,
    createdAt: string,
    editedAt?: string,
}
