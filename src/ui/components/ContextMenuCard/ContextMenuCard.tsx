import "./context-menu-card.scss"
import { ReactNode } from "react";

interface ContextMenuProps {
    children: ReactNode,
    top: number,
    left: number,
    className?: string,
}

function ContextMenuCard({children, top, left, className, }: ContextMenuProps) {
    const position_x = {
        left: `${left}px`
    }
    const position_y = {
        top: `${top}px`
    }
    return (
        <div className={`menu ${className}`} style={{...position_x, ...position_y}}>
            {children}
        </div>
    )
}

export default ContextMenuCard