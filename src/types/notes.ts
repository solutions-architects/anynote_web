export type Note = {
    id: number,
    name: string,
    parentFolderId?: number,
    createdAt: string,
    editedAt?: string,
    contents: string,
    type: "note" | "folder",
    isOpen: boolean,
}
