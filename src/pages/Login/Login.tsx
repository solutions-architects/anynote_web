import AuthCard from "../../ui/components/AuthCard/AuthCard"
import { useState } from "react"
import { FormErrors } from "../../types/auth"
import { login } from "../../services/api/auth"
import { validatePassword, validateUsername } from "../../utils/auth"
import { isAxiosError } from "axios"
import useAuth from "../../services/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { loggedInRedirectUrl } from "../../services/api/urls"
import ControlledInput from "../../ui/components/TextInput/ControlledInput"
 
export default function Login() {
    const [username, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<FormErrors>({})
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        navigate(loggedInRedirectUrl, { replace: true })
    }
    
    const submitForm = async () => {
        const usernameError = validateUsername(username)
        const passwordError = validatePassword(password)

        setErrors({
            username: usernameError,
            password: passwordError,
        })

        if (usernameError || passwordError) {
            return
        }

        try {
            await login(username, password)
            navigate(loggedInRedirectUrl, { replace: true })
        } catch (err) {
            if (isAxiosError(err) && err.response?.data) {

                const errors = err.response.data
                setErrors({
                    form: errors.detail,
                    username: errors.username,
                    password: errors.password
                })
                console.error(err)
                console.log(err.response?.data)
                return
            } 

            setErrors({
                form: "Unexpected error occured. Check developer console for more information"
            })
            console.error(err)
        }
    }
    
    return (
        <AuthCard
        type="login"
        onSubmit={submitForm}
        errorText={errors.form}
        >
            <ControlledInput 
            value={username}
            label="Username"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
            }
            errorText={errors.username}
            />
            <ControlledInput 
            value={password}
            label="Password"
            type="password"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
            }
            sideLinkText="Forgot password?"
            sideLinkTo="/forgot-password"
            errorText={errors.password}
            />
        </AuthCard>
    )
}
