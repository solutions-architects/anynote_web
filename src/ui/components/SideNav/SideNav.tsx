import "./side-nav.scss"
import Logo from "../Logo/Logo"
import IconButton from "../IconButton/IconButton"

export default function SideNav() {
    const handleAddNote = () => {

    }

    const handleAddFolder = () => {

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
        </nav>
    )
}
