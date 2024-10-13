import "./side-nav.scss"
import Logo from "../Logo/Logo"
import IconButton from "../IconButton/IconButton"
import Note from "../Note/Note"
import { AppDispatch, RootState } from "../../../services/state/store"
import { useSelector, useDispatch } from "react-redux"
import {  
    createNote,
    deleteNote
} from "../../../services/state/notes/notesSlice"

export default function SideNav() {
    const notes = useSelector((state: RootState) => state.notes)
    console.table(notes.notes)
    const dispatch = useDispatch<AppDispatch>()

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
                    onClick={() => dispatch(createNote("note"))}
                    />
                    <IconButton
                    icon="add_folder"
                    onClick={() => dispatch(createNote("folder"))}
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
                    notes.notes.filter((note) => !note.parentFolderId && note.type === "folder").map((note) => (
                        <Note 
                        key={note.id}
                        note={note}
                        />
                    ))
                }
                {
                    notes.notes.filter((note) => !note.parentFolderId && note.type === "note").map((note) => (
                        <Note 
                        key={note.id}
                        note={note}
                        />
                    ))
                }
            </div>
        </nav>
    )
}
