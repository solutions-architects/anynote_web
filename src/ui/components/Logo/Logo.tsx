import "./logo.scss"
import logo from "../../../ui/assets/icons/logo.svg";
import { Link } from "react-router-dom"

interface Props {
    linkTo?: string,
}

export default function Logo({ linkTo = "/" }: Props) {
    return (
        <Link 
        to={linkTo}
        className="logo"
        >
            <img src={logo} alt="Anynote" />
        </Link>
    )
}
