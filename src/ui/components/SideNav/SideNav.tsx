import "./side-nav.scss"
import Logo from "../Logo/Logo"
import IconButton from "../IconButton/IconButton"
import Note from "../Note/Note"
import Folder from "../Folder/Folder"
import { AppDispatch, RootState } from "../../../services/state/store"
import { useSelector, useDispatch } from "react-redux"
import {  
    createNote,
    createFolder,
    
} from "../../../services/state/notes/elementSlice"

export default function SideNav() {
    const elements = useSelector((state: RootState) => state.elements)
    console.table(elements.notes)
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
                    onClick={() => dispatch(createNote())}
                    />
                    <IconButton
                    icon="add_folder"
                    onClick={() => dispatch(createFolder())}
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
            <div className="side-nav__notes">
                {
                    elements.folders.filter((folder) => !folder.parentFolderId).map((folder) => (
                        <Folder 
                        key={folder.id}
                        folder={folder}
                        />
                    ))
                }
                {
                    elements.notes.filter((note) => !note.parentFolderId).map((note) => (
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
