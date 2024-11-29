import Button from "../../ui/components/Button/Button"
import "./register-confirm.scss"
import { useSearchParams } from "react-router-dom"


export default function RegisterConfirm() {
    const [searchParams] = useSearchParams()
    const email = searchParams.get("email")

    return (
        <div className="register-confirm">
            <div className="register-confirm__main-container">
                <div className="register-confirm__header">
                    Verify your email        
                </div>
                <div className="register-confirm__message">
                    Confirmation link sent to your email: {email}
                </div>
                <div className="register-confirm__button">
                    <Button
                    type="primary"
                    onClick={() => window.open("https://mail.google.com/")}
                    >
                        Open Gmail
                    </Button>
                </div>
            </div>
        </div>
    )
}
