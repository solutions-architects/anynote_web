import { useEffect, useState } from "react"
import { logout } from "../api/auth"
import { tryAuth } from "../api/auth"

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>()

    useEffect(() => {
        const authenticate = async() => {
            const success = await tryAuth()
            setIsAuthenticated(success)
        }

        authenticate()
    }, [])

    return { isAuthenticated, logout }
}

export default useAuth
