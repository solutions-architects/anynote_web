import "./menu-button.scss"
import { forwardRef, ReactNode, useRef, useState } from "react";
import {
    UserCircleIcon as UserCircleSolid,
    Cog6ToothIcon as SettingsSolid,
    ChevronRightIcon as ArrowRightOutline,
    CheckIcon as CheckSolid,
    BoldIcon as BoldSolid,
    ItalicIcon as ItalicSolid,
    UnderlineIcon as UnderlineSolid,
    StrikethroughIcon as StrikeThroughSolid,
    H1Icon as H1,
    H2Icon as H2,
    H3Icon as H3,
    TrashIcon as trash,
} from "@heroicons/react/24/solid"

const iconLeftMap = {
    settings: SettingsSolid,
    profile: UserCircleSolid,
    bold: BoldSolid,
    italic: ItalicSolid,
    underline: UnderlineSolid,
    strikethrough: StrikeThroughSolid,
    h1: H1,
    h2: H2,
    h3: H3,
    trash: trash,
}

const iconRightMap = {
    arrowRight: ArrowRightOutline,
    check: CheckSolid,
}

interface MenuButtonProps {
    children?: ReactNode,
    iconLeft?: "settings" | "profile" | "bold" | "italic" | "underline" | "strikethrough" | "h1" | "h2" | "h3" | "trash",
    iconRight?: "arrowRight" | "check",
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className?: string,
    isSubmenu?: boolean,
    submenu?: ReactNode,
}

export const MenuButton = forwardRef<HTMLDivElement, MenuButtonProps>(({children, className, onClick, iconLeft, iconRight, isSubmenu, submenu}, ref) => {
    const IconLeft = iconLeftMap[iconLeft]
    const IconRight = iconRightMap[iconRight]
    const delayTimer = useRef<NodeJS.Timeout | undefined>(undefined)
    const handleMouseEnter = () => {
        if (delayTimer.current) {
            clearTimeout(delayTimer.current)
        }
        setSubMenuVisible(true)
    }
    const handleMouseLeave = () => {
        delayTimer.current = setTimeout(() => {
            setSubMenuVisible(false)
        }, 200)
    }
    const [isSubMenuVisible, setSubMenuVisible] = useState(false)
    return (
        <div
        onMouseEnter={() => isSubmenu && handleMouseEnter()}
        onMouseLeave={() => isSubmenu && handleMouseLeave()} ref={ref}>
        <button className={`menu-button ${className}`}
        onClick={onClick} >
                <div className="menu-button__container">
                    {iconLeft ? (
                        <IconLeft className="menu-button__icon menu-button__icon--left"/>
                    ) : ("")}

                    <div>{ children }</div>
                </div>

                {iconRight ? (
                    <IconRight className="menu-button__icon menu-button__icon--right"/>
                ) : (<div className="menu-button__icon"></div>)}

        </button>
        {isSubmenu && isSubMenuVisible && (
            <div>
                {submenu}
            </div>
        )}
        </div>
    )
}
)
