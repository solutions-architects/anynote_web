import "./landing.scss"
import logo from "../../ui/assets/icons/logo.svg";
import { Link } from "react-router-dom"

function Landing() {
    
    return (
        <div className="landing">
            <div className="landing__logo">
                <img src={logo} />
            </div>
            <Link className="landing__link" to="/login">
                Login page
            </Link>
            <Link className="landing__link" to="/register">
                Register page
            </Link>
            <Link className="landing__link" to="/workspace">
                Workspace page
            </Link>
            <Link className="landing__link" to="/profile">
                Profile page
            </Link>
        </div>
    )
}

export default Landing
