import AuthCard from "../../ui/components/AuthCard/AuthCard"
import { useState } from "react"
import ControlledInput from "../../ui/components/TextInput/ControlledInput"

export default function Register() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = () => {

    }
    
    return (
        <AuthCard
        type="register"
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
            value={username}
            label="Username"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
            }
            />
            <ControlledInput 
            value={password}
            label="Password"
            type="password"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
            }
            />
        </AuthCard>
    )
}
