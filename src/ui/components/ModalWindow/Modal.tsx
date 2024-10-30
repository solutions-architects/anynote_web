import "./modal.scss"
import {ReactNode} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../services/state/store.ts";
import {closeModal} from "../../../services/state/slices/modalSlice.ts";

interface ModalProps {
    children: ReactNode,
    className?: string,
    modalId: string,
}

function Modal({children, className, modalId}: ModalProps) {
    const isOpen = useSelector((state: RootState) => (state.modals[modalId] ?? false))
    const dispatch = useDispatch<AppDispatch>()
    const handleContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
    }
    const handleClose = () => {
        dispatch(closeModal(modalId))
    }
    return (
        <>
            {isOpen ? (
                <div className="modal modal--background-filter" onClick={handleClose}>
                    <div className={`modal__card ${className}`} onClick={handleContentClick}>
                        {children}
                    </div>
                </div>
            ): ("")
            }
        </>
    )
}

export default Modal