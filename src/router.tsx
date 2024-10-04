import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Workspace from "./pages/Workspace/Workspace"
import Profile from "./pages/Profile/Profile"
import Landing from "./pages/Landing/Landing"
import { createBrowserRouter } from "react-router-dom"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/workspace",
        element: <Workspace />
    },
    {
        path: "/profile",
        element: <Profile />
    },
])
