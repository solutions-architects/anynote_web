import "./icon-button.scss"
import { 
    TrashIcon as TrashOutline, 
    PencilIcon as PencilOutline,
    LinkIcon as LinkOutline,
    MagnifyingGlassIcon as MagnifyingGlassOutline,
    FunnelIcon as FunnelOutline,
    FolderPlusIcon as FolderPlusOutline,
    PencilSquareIcon as PencilSquareOutline
} from "@heroicons/react/24/outline"
import { 
    UserCircleIcon as UserCircleSolid,
    Cog6ToothIcon as SettingsSolid,
} from "@heroicons/react/24/solid"
import { NavLink } from "react-router-dom"

const iconMap = {
    trash: TrashOutline,
    pencil: PencilOutline,
    pin: LinkOutline,
    search: MagnifyingGlassOutline, 
    sort: FunnelOutline, 
    add_folder: FolderPlusOutline,
    add_note: PencilSquareOutline,
    settings: SettingsSolid,
    profile: UserCircleSolid
}

interface IconButtonProps {
    icon: "trash" | "pencil" | "pin" | "search" | 
    "sort" | "add_folder" | "add_note" | "settings" | "profile"
    onClick?: React.MouseEventHandler,
    size?: "small" | "default",
    linkTo?: string,
}

function IconButton({ icon, onClick, linkTo, size = "small" }: IconButtonProps) {
    const Icon = iconMap[icon]

    return (
        linkTo ? (
            <NavLink 
            className={({ isActive }) =>
                `icon icon--${size} ${isActive ? "icon--active" : ""}`
            }
            to={linkTo}
            onClick={onClick}
            >
                <Icon className="icon__img" />
            </NavLink>
        ) : (
            <div
            className={`icon icon--${size}`}
            onClick={onClick}
            >
                <Icon className="icon__img" />
            </div>
        )
    )
}

export default IconButton