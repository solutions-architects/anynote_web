import "./note-edit.scss"
import React from "react"
import CustomEditor from "../../ui/components/Editor/CustomEditor.tsx";
import {useSelector} from "react-redux";
import { RootState } from "../../services/state/store.ts";

export default function NoteEdit() {

    const selector = useSelector((state: RootState) => state.currentNote)
    return (
        <div className="note-edit">
            <div className="note-edit__header">{selector.note.name}</div>
            <div className="note-edit__divider"></div>
            <CustomEditor note={selector.note} />
        </div>
    )
}
