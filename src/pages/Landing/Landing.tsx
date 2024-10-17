import "./landing.scss"
import Logo from "../../ui/components/Logo/Logo.tsx"
import Button from "../../ui/components/Button/Button.tsx"
import landing from "../../ui/assets/icons/landing.png"
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom"
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
                <div className="landing__content landing__content--left">
                    <div className="landing__logo-size">
                        <Logo />
                    </div>
                <div className="landing__body">
                    <div className="landing__heading">
                        <div className="landing__heading-text">Any note you want.</div>
                        <div className="landing__heading-text">Anywhere you want.</div>
                    </div>
                    <div className="landing__body-text">Anynote is an open-source app which organizes
                        your notes and synchronizes them among multiple platforms. For free.</div>
                    <div className="landing__buttons-container">
                        <Button onClick={handleButtonClick} type="primary"
                                className="landing__buttons-container--primary">
                            Download for Windows</Button>
                        <Button onClick={handleButtonClick} type="secondary"
                                className="landing__buttons-container--secondary">
                            Download for Android
                        </Button>
                        <Button onClick={handleButtonClick} type="secondary"
                                className="landing__buttons-container--secondary">
                            Download for Android
                        </Button>
                    </div>
                </div>
                </div>
                <div className="landing__content landing__content--right">
                    <div className="landing__navbar">
                        <Link className="landing__navbar-text" to={''}>Contact us</Link>
                        <Button onClick={handleSignInButton} type="primary" className="landing__navbar-width">
                            Sign in</Button>
                    </div>
                    <img src={landing} alt="Landing" className="landing__main-image-size"/>
                </div>
            </div>
        </div>
    )
}

export default Landing