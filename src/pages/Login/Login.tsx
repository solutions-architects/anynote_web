import AuthCard from "../../ui/components/AuthCard/AuthCard"
import { useState } from "react"
import ControlledInput from "../../ui/components/TextInput/ControlledInput"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const submitForm = () => {

    }
    
    return (
        <AuthCard
        type="login"
        onSubmit={submitForm}
        >
            <ControlledInput 
            value={email}
            label="Email"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
            }
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
            />
        </AuthCard>
    )
}
