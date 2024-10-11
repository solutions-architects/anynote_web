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
        <div className="container">
            <div className="landing">
                <div className="landing__left">
                    <div className="landing__left__logo">
                        <Logo />
                    </div>
                <div className="landing__left__info">
                    <div className="landing__left__info__heading">
                        <div className="landing__left__info__heading__text">Any note you want.</div>
                        <div className="landing__left__info__heading__text">Anywhere you want.</div>
                    </div>
                    <div className="landing__left__info__body">Anynote is an open-source app which organizes
                        your notes and synchronizes them among multiple platforms. For free.</div>
                    <div className="landing__left__info__buttons">
                        <Button onClick={handleButtonClick} type="primary" className="landing__left__info__buttons__primary">
                            Download for Windows</Button>
                        <Button onClick={handleButtonClick} type="secondary" className="landing__left__info__buttons__secondary">
                            Download for Android
                        </Button>
                        <Button onClick={handleButtonClick} type="secondary" className="landing__left__info__buttons__secondary">
                            Download for Android
                        </Button>
                    </div>
                </div>
                </div>
                <div className="landing__right">
                    <div className="landing__right__buttons">
                        <div className="landing__right__buttons__text">Contact us</div>
                        <Button onClick={handleSignInButton} type="primary" className="landing__right__buttons__width">
                            Sign in</Button>
                    </div>
                    <img src={landing} alt="Landing" className="landing__right__logo"/>
                </div>
            </div>
        </div>
    )
}

export default Landing