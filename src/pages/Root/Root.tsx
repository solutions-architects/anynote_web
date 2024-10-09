import "./root.scss"
import Logo from "../../ui/components/Logo/Logo"
import { Link } from "react-router-dom"

export default function Root() {
    
    return (
        <div className="root">
            <div className="root__logo">
                <Logo />
            </div>
            <Link className="root__link" to="/login">
                Login page
            </Link>
            <Link className="root__link" to="/register">
                Register page
            </Link>
            <Link className="root__link" to="/workspace/profile">
                Profile page
            </Link>
            <Link className="root__link" to="/workspace">
                Note page
            </Link>
            <Link className="root__link" to="/landing">
                Landing page
            </Link>
        </div>
    )
}
