import "./workspace.scss"
import SideNav from "../../ui/components/SideNav/SideNav"
import { Outlet } from "react-router-dom"

export default function Workspace() {
    return (
        <div className="workspace">
            <SideNav />
            <div className="workspace__container">
                <Outlet />
            </div>
        </div>
    )
}
