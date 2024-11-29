import "./dialogue.scss"
import Modal from "../ModalWindow/Modal.tsx";
import Button from "../Button/Button.tsx";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../services/state/store.ts";
import { closeModal } from "../../../services/state/slices/modalSlice.ts";

interface DialogueProps {
    title: string,
    children: ReactNode,
    onConfirm: React.MouseEventHandler<HTMLButtonElement>,
    modalId: string,
}

export default function Dialogue({ title, children, onConfirm, modalId }: DialogueProps) {
    const dispatch = useDispatch<AppDispatch>()
    const handleClose = () => {
        dispatch(closeModal(modalId))
    }
    return (
        <Modal modalId={modalId} className="dialogue dialogue--size">
            <div className="dialogue-title">{title}</div>

            <div className="children-container">
                {children}
            </div>

            <div className="dialogue__container">
                <Button onClick={onConfirm} className="dialogue__button-size">Confirm</Button>
                <Button onClick={handleClose} type="secondary" className="dialogue__button-size">Cancel</Button>
            </div>
        </Modal>
    )
}
