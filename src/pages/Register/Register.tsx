import AuthCard from "../../ui/components/AuthCard/AuthCard"
import { useState } from "react"
import { register } from "../../services/api/auth"
import { formErrors } from "../../types/auth"
import ControlledInput from "../../ui/components/TextInput/ControlledInput"
import { validateEmail, validatePassword, validateUsername } from "../../utils/validation"
import { AxiosError, isAxiosError } from "axios"

export default function Register() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<formErrors>({})

    const submitForm = async () => {
        const emailError = validateEmail(email)
        const usernameError = validateUsername(username)
        const passwordError = validatePassword(password)

        setErrors({
            email: emailError,
            username: usernameError,
            password: passwordError,
        })


        if (!emailError && !usernameError && !passwordError) {
            try {
                await register(email, username, password)
            } catch (err) {
                if (isAxiosError(err) && err.response && err.response.data) {

                    const errors = err.response.data
                    setErrors({
                        email: errors["email"],
                        username: errors["username"],
                        password: errors.password
                    })
                    console.log(err.response?.data)
                    return
                } 

                setErrors({
                    form: "An unknown error occured."
                })
                console.error(err)
            }
        }
    }
    
    return (
        <AuthCard
        type="register"
        onSubmit={submitForm}
        errorText={errors.form}
        >
            <ControlledInput 
            value={email}
            label="Email"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value)
                    setErrors({...errors, email: ""})
                }
            }
            errorText={errors.email}
            />
            <ControlledInput 
            value={username}
            label="Username"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value)
                    setErrors({...errors, username: ""})
                }
            }
            errorText={errors.username}
            />
            <ControlledInput 
            value={password}
            label="Password"
            type="password"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                    setErrors({...errors, password: ""})
                }
            }
            errorText={errors.password}
            />
        </AuthCard>
    )
}
