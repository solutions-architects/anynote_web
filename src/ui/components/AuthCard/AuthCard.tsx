import "./auth-card.scss"
import Logo from "../Logo/Logo"
import { Link } from "react-router-dom"
import ControlledInput, { 
    Props as ControlledInputProps
} from "../TextInput/ControlledInput"
import Button from "../Button/Button"

interface Props {
    inputs: ControlledInputProps[],
    onSubmit: React.MouseEventHandler<HTMLButtonElement>,
    buttonText: string,
    headerText: string,
    footerText: string,
    footerLinkText: string,
    footerLinkTo: string,
}

export default function AuthCard({
    inputs,
    onSubmit,
    buttonText,
    headerText,
    footerText,
    footerLinkText,
    footerLinkTo,
 }: Props) {
    const innerContainerHeight = 22 + inputs.length * 3.5

    return (
        <div className={`auth-card`}>
            <div className="auth-card__logo">
                <Logo />
            </div>
            <div className="auth-card__outer-container">
                <div 
                className={`auth-card__inner-container`}
                style={{ height: `${innerContainerHeight}rem` }}
                >
                    <div className="auth-card__header">
                        { headerText }
                    </div>
                    {
                        inputs.map((input) => (
                            <ControlledInput
                            value={input.value}
                            label={input.label}
                            name={input.name}
                            onChange={input.onChange}
                            type={input.type}
                            sideLinkText={input.sideLinkText}
                            sideLinkTo={input.sideLinkTo}
                            />
                        ))
                    }
                    <Button 
                    className="auth-card__button"
                    onClick={onSubmit}
                    >
                        { buttonText }
                    </Button>
                </div>
                
                <div className="auth-card__footer">
                    { footerText }
                    &nbsp;
                    <Link 
                    className="auth-card__link" 
                    to={footerLinkTo} 
                    >
                        { footerLinkText }
                    </Link>
                </div>
            </div>
        </div>
    )
}