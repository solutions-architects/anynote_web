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
    return (
        <div className="landing">
            <div className="landing__container">
                <div className="landing__left">
                    <div className="landing__left-logo">
                        <Logo />
                    </div>
                <div className="landing__left-info">
                    <div className="landing__heading">
                        <div className="landing__heading-text">Any note you want.</div>
                        <div className="landing__heading-text">Anywhere you want.</div>
                    </div>
                    <div className="landing__body">Anynote is an open-source app which organizes
                        your notes and synchronizes them among multiple platforms. For free.</div>
                    <div className="landing__buttons">
                        <Button onClick={handleButtonClick} type="primary"
                                className="landing__buttons--primary">
                            Download for Windows</Button>
                        <Button onClick={handleButtonClick} type="secondary"
                                className="landing__buttons--secondary">
                            Download for Android
                        </Button>
                        <Button onClick={handleButtonClick} type="secondary"
                                className="landing__buttons--secondary">
                            Download for Android
                        </Button>
                    </div>
                </div>
                </div>
                <div className="landing__right">
                    <div className="landing__heading-buttons">
                        <div className="landing__heading-buttons-text">Contact us</div>
                        <Button onClick={handleSignInButton} type="primary" className="landing__heading-buttons-width">
                            Sign in</Button>
                    </div>
                    <img src={landing} alt="Landing" className="landing__right-logo"/>
                </div>
            </div>
        </div>
    )
}

export default Landing