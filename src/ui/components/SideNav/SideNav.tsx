import "./side-nav.scss"
import Logo from "../Logo/Logo"
import IconButton from "../IconButton/IconButton"
import NoteElement from "../NoteElement/NoteElement"
import { AppDispatch, RootState } from "../../../services/state/store"
import { useSelector, useDispatch } from "react-redux"
import { 
    createFolder, 
    createNote,
    deleteFolder,
    deleteNote
} from "../../../services/state/notes/notesSlice"

export default function SideNav() {
    const elements = useSelector((state: RootState) => state.notes)
    const dispatch = useDispatch<AppDispatch>()

    const handleAddNote = () => {
        dispatch(createNote())
    }

    const handleAddFolder = () => {
        dispatch(createFolder())
    }

    const handleSortMenu = () => {

    }

    const handleSearchMenu = () => {

    }

    return (
        <nav className="side-nav">
            <div className="side-nav__top-nav">
                <div className="side-nav__logo">
                    <Logo linkTo="/workspace"/>
                </div>
                <div className="side-nav__top-icons">
                    <IconButton
                    icon="profile"
                    linkTo="profile"
                    />
                </div>
            </div>
            <div className="side-nav__workspace-nav">
                <div className="side-nav__workspace-side">
                    <IconButton
                    icon="add_note"
                    onClick={handleAddNote}
                    />
                    <IconButton
                    icon="add_folder"
                    onClick={handleAddFolder}
                    />
                    <IconButton
                    icon="sort"
                    onClick={handleSortMenu}
                    />
                </div>
                <div className="side-nav__workspace-side">
                    <IconButton
                    icon="search"
                    onClick={handleSearchMenu}
                    />
                </div>
            </div>
            <div className="side-nav__elements">
                {
                    elements.folders.map((folder) => (
                        <NoteElement 
                        key={folder.id}
                        element={folder}
                        />
                    ))
                }
                {
                    elements.notes.filter((note) => !note.parentFolderId).map((note) => (
                        <NoteElement 
                        key={note.id}
                        element={note}
                        />
                    ))
                }
            </div>
        </nav>
    )
}
