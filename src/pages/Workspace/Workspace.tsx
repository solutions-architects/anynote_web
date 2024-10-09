import "./workspace.scss"
import SideNav from "../../ui/components/SideNav/SideNav"
import { Outlet } from "react-router-dom"

export default function Workspace() {
    return (
        <div className="workspace">
            <SideNav />
            <div className="workspace__page-container">
                <div className="workspace__page-container-inner">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
