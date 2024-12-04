import "./note-edit.scss"
import Editor from "../../ui/components/Editor/Editor.tsx";
import {useSelector} from "react-redux";
import { RootState } from "../../services/state/store.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Note} from "../../types/elements.ts"

export default function NoteEdit() {
    const initialNote: Note = {
        id: 1,
        name: "",
        createdAt: "",
        isOpen: false,
        contents: [
            {
                type: "paragraph",
                children: [{ text: "" }],
            },
        ],
    }
    const selector = useSelector((state: RootState) => state.currentNote)
    const [note, setNote] = useState<Note>(initialNote)
    const navigate = useNavigate()
    useEffect(() => {
        if (!selector.note) {
            navigate("/workspace")
        } else {
            setNote(selector.note)
        }
    }, [selector, navigate]);
    return (
        <div className="note-edit">
            <div className="note-edit__header">{note?.name}</div>
            <div className="note-edit__divider"></div>
            <Editor note={note} />
        </div>
    )
}
