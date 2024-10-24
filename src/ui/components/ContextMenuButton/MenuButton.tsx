import "./menu-button.scss"
import {ReactNode} from "react";
import {
    UserCircleIcon as UserCircleSolid,
    Cog6ToothIcon as SettingsSolid,
    ChevronRightIcon as ArrowRightOutline,
    CheckIcon as CheckSolid,
} from "@heroicons/react/24/solid"

const iconLeftMap = {
    settings: SettingsSolid,
    profile: UserCircleSolid
}
const iconRightMap = {
    arrowRight: ArrowRightOutline,
    check: CheckSolid,
}
interface MenuButtonProps {
    children: ReactNode,
    iconLeft?: "settings" | "profile",
    iconRight?: "arrowRight" | "check",
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className?: string,
}

function MenuButton({children, className, onClick, iconLeft=null, iconRight=null}: MenuButtonProps) {
    const IconLeft = iconLeftMap[iconLeft]
    const IconRight = iconRightMap[iconRight]
    return (
        <button className={`button ${className}`}
        onClick={onClick}>
                <div className="button__container">
                    {iconLeft ? (
                        <IconLeft className="button__icon button__icon--left"/>
                    ) : ("")}

                    { children }
                </div>

                {iconRight ? (
                    <IconRight className="button__icon button__icon--right"/>
                ) : (<div className="button__icon"></div>)}

        </button>
    )
}

export default MenuButton