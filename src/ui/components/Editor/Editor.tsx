import "./editor.scss"
import { useCallback, useEffect, useState } from "react";
import { createEditor, Descendant, Transforms } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import useContextMenu from "../../../services/hooks/useContextMenu.ts";
import { useDispatch } from "react-redux";
import { updateContents } from "../../../services/state/slices/noteSlice.ts";
import { Note } from "../../../types/elements.ts";
import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import Leaf from "../Leaf/Leaf.tsx";

interface CustomEditorProps {
    note: Note
}

function Editor({ note }: CustomEditorProps) {

    const { clicked, setClicked, points, setPoints } = useContextMenu()
    const [editor] = useState(() => withReact(createEditor()))
    // If the note is new (initial value is required for editor to exist)
    const initialValue: Descendant[] = [
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]
    const dispatch = useDispatch()
    useEffect(() => {
        if (note.contents) {
            editor.children = note.contents; // Inserting note data directly to the editor
            editor.operations = [];
            Transforms.select(editor, { path: [0, 0], offset: 0 }); // For correct children change
            editor.onChange();
        }
    }, [note.contents, editor]);

    // Rendering inline formatting (for blocks we will use renderBlock, which renders entire react component)
    // for more detailed info -> see slate docs
    const renderLeaf = useCallback((props: any) => {
        return <Leaf {...props} />
    }, [])

    const handleChange = (newValue: Descendant[]) => {
        dispatch(updateContents({id: note.id, contents: newValue}))
    }

    return (
        <Slate editor={editor} initialValue={initialValue} onChange={handleChange} onValueChange={handleChange}>
            <Editable className="editor"
            placeholder="Put here your note!"
            renderLeaf={renderLeaf}
            onContextMenu={(e) => {
              e.preventDefault()
                setClicked(true)
                setPoints({
                x: e.pageX,
                y: e.pageY,
           })
                      }}/>
            {clicked && (
              <ContextMenu points={points} editor={editor} />
            )}
        </Slate>

    )
}
export default Editor

