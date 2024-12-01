import "./context-menu.scss"
import ContextMenuCard from "../ContextMenuCard/ContextMenuCard.tsx"
import { MenuButton } from "../ContextMenuButton/MenuButton.tsx"
import { useEffect, useRef, useState } from "react"
import { BaseEditor } from "slate"
import { ReactEditor } from "slate-react"
import { ClearAllFormatting, toggleMark } from "../../../utils/editor.ts"
import { HeadingSubMenu } from "./SubMenus/HeadingSubMenu.tsx"

interface ContextMenuProps {
    points: { x: number, y: number },
    editor: BaseEditor & ReactEditor,
}

function ContextMenu({points, editor}: ContextMenuProps) {

    const ref = useRef<HTMLDivElement | null>(null)
    const [submenuPosition, setSubmenuPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        if (ref.current) {
            if ("getBoundingClientRect" in ref.current) {
                const rect = ref.current.getBoundingClientRect()
                // rect.left gets x coordinate of a left side of an element, rect.width gets width in px of an element
                const x = rect.left + window.scrollX + rect.width + 15
                const y = rect.top + window.scrollY
                setSubmenuPosition({x: x, y: y})
            }
        }

    }, [points]);

    return (
        <ContextMenuCard top={points.y} left={points.x}>
            <MenuButton onClick={() => {}} iconLeft="h1" isSubmenu={true} iconRight="arrowRight"
                        submenu={<HeadingSubMenu editor={editor} pointsSub={submenuPosition}/>} ref={ref}>
                        Headings</MenuButton>
            <MenuButton onClick={() => toggleMark(editor, "bold")}
                        iconLeft="bold">Bold</MenuButton>
            <MenuButton onClick={() => toggleMark(editor, "italic")}
                        iconLeft="italic">Italic</MenuButton>
            <MenuButton onClick={() => toggleMark(editor, "underline")}
                        iconLeft="underline">Underline</MenuButton>
            <MenuButton onClick={() => toggleMark(editor, "strikethrough")}
                        iconLeft="strikethrough">StrikeThrough</MenuButton>
            <MenuButton onClick={() => ClearAllFormatting(editor)}
                        iconLeft="trash">Clear Formatting</MenuButton>
        </ContextMenuCard>
    )
}


export default ContextMenu