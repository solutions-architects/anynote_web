import "./controlled-input.scss"
import { Link } from "react-router-dom"

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    label: string,
    value: string,
    sideLinkText?: string,
    sideLinkTo?: string,
    type?: "text" | "password",
    errorText?: string,
}


export default function ControlledInput({ 
    label, 
    value, 
    onChange, 
    type = "text", 
    sideLinkText = "", 
    sideLinkTo = "",
    errorText = "",
}: Props) {
    return (
        <div className="controlled-input">
            <div className="controlled-input__above">
                <label 
                htmlFor={label.toLowerCase()}
                className="controlled-input__label"
                >
                    { label }
                </label>
                {
                    sideLinkText ? (
                        <Link
                        to={sideLinkTo}
                        className="controlled-input__side-link"
                        >
                            {sideLinkText}
                        </Link>
                    ) : (
                        <div></div>
                    )
                }
            </div>
            <input
            value={value}
            onChange={onChange}
            className="controlled-input__input"
            type={type}
            name={label.toLowerCase()} 
            id={label.toLowerCase()}
            />
            {
                errorText && (
                    <div className="controlled-input__error">
                        { errorText }
                    </div>
                )
            }
        </div>
    )
}
