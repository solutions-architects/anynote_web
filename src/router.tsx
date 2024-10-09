import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Workspace from "./pages/Workspace/Workspace"
import Profile from "./pages/Profile/Profile"
import Root from "./pages/Root/Root"
import Landing from "./pages/Landing/Landing"
import Note from "./pages/Note/Note"
import { createBrowserRouter } from "react-router-dom"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    },
    {
        path: "/landing",
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
        element: <Workspace />,
        children: [
            {
                path: "",
                element: <Note />
            },
            {
                path: "profile",
                element: <Profile />
            },
        ]
    },
])
