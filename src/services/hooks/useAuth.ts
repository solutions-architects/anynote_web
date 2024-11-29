import { useEffect, useState } from "react"
import { validateToken, refreshToken, logout } from "../api/auth"

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuth = async() => {
            const active = await isActiveToken()
            if (!active) {
                return
            }

            const result = await tryRefresh()
            setIsAuthenticated(result)
        }

        checkAuth()
    }, [])

    async function isActiveToken() {
        try {
            await validateToken()
            return true
        } catch {
            return false
        }
    }

    async function tryRefresh() {
        try {
            await refreshToken()
            return true
        } catch {
            return false
        }
    }

    return { isAuthenticated, logout }
}

export default useAuth
