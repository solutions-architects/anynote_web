import "./landing.scss"
import Logo from "../../ui/components/Logo/Logo.tsx"
import Button from "../../ui/components/Button/Button.tsx"
import landing from "../../ui/assets/icons/landing.png"
import {useNavigate} from "react-router-dom";
function Landing() {
    const navigate = useNavigate();
    const handleButtonClick = (): void => {

    }
    const handleSignInButton = (): void => {
        navigate("/login")
    }
    // move container class into the landing hierarchy
    return (
        <div className="landing">
            <div className="landing__container">
                <div className="landing__container-left">
                    <div className="landing__container-left-logo">
                        <Logo />
                    </div>
                <div className="landing__container-left-info">
                    <div className="landing__container-left-info-heading">
                        <div className="landing__container-left-info-heading-text">Any note you want.</div>
                        <div className="landing__container-left-info-heading-text">Anywhere you want.</div>
                    </div>
                    <div className="landing__container-left-info-body">Anynote is an open-source app which organizes
                        your notes and synchronizes them among multiple platforms. For free.</div>
                    <div className="landing__container-left-info-buttons">
                        <Button onClick={handleButtonClick} type="primary"
                                className="landing__container-left-info-buttons-primary">
                            Download for Windows</Button>
                        <Button onClick={handleButtonClick} type="secondary"
                                className="landing__container-left-info-buttons-secondary">
                            Download for Android
                        </Button>
                        <Button onClick={handleButtonClick} type="secondary"
                                className="landing__container-left-info-buttons-secondary">
                            Download for Android
                        </Button>
                    </div>
                </div>
                </div>
                <div className="landing__container-right">
                    <div className="landing__container-right-buttons">
                        <div className="landing__container-right-buttons-text">Contact us</div>
                        <Button onClick={handleSignInButton} type="primary" className="landing__container-right-buttons-width">
                            Sign in</Button>
                    </div>
                    <img src={landing} alt="Landing" className="landing__container-right-logo"/>
                </div>
            </div>
        </div>
    )
}

export default Landing