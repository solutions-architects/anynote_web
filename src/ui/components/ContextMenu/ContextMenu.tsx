import React from "react"
import "./context-menu.scss"

interface Props { 
    positionX: number,
    positionY: number,
    isOpen: boolean,
    children: React.ReactNode,
    menuRef: React.RefObject<HTMLMenuElement>
}

export default function ContextMenu({ positionX, positionY, isOpen, children, menuRef }: Props) {
    return (
        <menu 
        style={{
            top: `${positionY + 2}px`,
            left: `${positionX + 2}px`,
        }}
        className={`context-menu ${!isOpen ? "context-menu--hidden" : ""}`}
        ref={menuRef}
        >
            { 
                React.Children.map(children, child => (
                    <div 
                    key={child?.toString()}
                    className="context-menu__element">
                        { child }
                    </div>
                )) 
            }
        </menu>
    )
}
