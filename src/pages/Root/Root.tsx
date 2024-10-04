import "./root.scss"
import logo from "../../ui/assets/icons/logo.svg";
import { Link } from "react-router-dom"

function Root() {
    
    return (
        <div className="root">
            <div className="root__logo">
                <img src={logo} />
            </div>
            <Link className="root__link" to="/login">
                Login page
            </Link>
            <Link className="root__link" to="/register">
                Register page
            </Link>
            <Link className="root__link" to="/workspace">
                Workspace page
            </Link>
            <Link className="root__link" to="/profile">
                Profile page
            </Link>
            <Link className="root__link" to="/landing">
                Landing page
            </Link>
        </div>
    )
}

export default Root
