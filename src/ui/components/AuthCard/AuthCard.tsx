import "./auth-card.scss"
import Logo from "../Logo/Logo"
import { Link } from "react-router-dom"
import Button from "../Button/Button"

interface Props {
    onSubmit: React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode,
    type: "register" | "login",
    errorsActive?: number,
    errorText?: string,
    canSubmit?: boolean,
    submitPending?: boolean,
}

export default function AuthCard({
    onSubmit,
    children,
    type,
    errorText = "",
    errorsActive = 0,
    canSubmit = true,
    submitPending = false,
 }: Props) {
    
    function calculateContainerHeight(): number {
        let height = 28
        if (type === "register") {
            height += 5
        }

        height += errorsActive

        return height
    }

    return (
        <div className={"auth-card"}>
            <div className="auth-card__logo">
                <Logo />
            </div>
            <div className="auth-card__outer-container">
                <div 
                className={"auth-card__inner-container"}
                style={{ height: `${calculateContainerHeight()}rem`}}
                >
                    <div className="auth-card__header">
                        {
                            type === "login" 
                            ? "Sign in to your account" 
                            : "Create your Anynote account"
                        }
                    </div>
                    { children }
                    {
                        errorText && (
                            <div className="auth-card__error">
                                { errorText }
                            </div>
                        )
                    }
                    <Button 
                    className="auth-card__button"
                    onClick={onSubmit}
                    disabled={!canSubmit}
                    loading={submitPending}
                    >
                        { 
                            type === "login"
                            ? "Sign in"
                            : "Create account"
                        }
                    </Button>
                </div>

                <div className="auth-card__footer">
                    {
                        type === "login"
                        ? "New to anynote? "
                        : "Already have an account? "
                    }
                    &nbsp;
                    <Link 
                    className="auth-card__link" 
                    to={type === "login" ? "/register" : "/login"}
                    >
                        {
                            type === "login"
                            ? "Create account"
                            : "Sign in"
                        }
                    </Link>
                </div>
            </div>
        </div>
    )
}