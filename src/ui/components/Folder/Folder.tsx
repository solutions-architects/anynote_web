import "./folder.scss"
import { Folder as FolderType } from "../../../types/elements"
import { FolderIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

interface Props {
    folder: FolderType,
}

export default function Folder({ folder }: Props) {

    return (
        <div
        className={`folder`}
        >
            <div className="folder__icons">
                <ChevronRightIcon className="folder__icon folder__icon--arrow" />
                <FolderIcon className="folder__icon" />
            </div>
            <div className="folder__name">
                { folder.name }
            </div>
        </div>
    )
}
