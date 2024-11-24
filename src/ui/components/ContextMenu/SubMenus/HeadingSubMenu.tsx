import React from "react";
import ContextMenuCard from "../../ContextMenuCard/ContextMenuCard.tsx";
import { MenuButton } from "../../ContextMenuButton/MenuButton.tsx";
import { toggleMark } from "../../../../utils/editor.ts";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

interface SubMenuProps {
    pointsSub: { x: number, y: number },
    editor: BaseEditor & ReactEditor,
}

export function HeadingSubMenu({ pointsSub, editor }: SubMenuProps) {

    return (
        <ContextMenuCard top={pointsSub.y} left={pointsSub.x}>
            <MenuButton onClick={() => toggleMark(editor, "h1")} iconLeft="h1">Heading 1</MenuButton>
            <MenuButton onClick={() => toggleMark(editor, "h2")} iconLeft="h2">Heading 2</MenuButton>
            <MenuButton onClick={() => toggleMark(editor, "h3")} iconLeft="h3">Heading 3</MenuButton>
        </ContextMenuCard>
    )
}