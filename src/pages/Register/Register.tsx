import AuthCard from "../../ui/components/AuthCard/AuthCard"
import { useState } from "react"
import { 
    Props as ControlledInputProps 
} from "../../ui/components/TextInput/ControlledInput"

export default function Register() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const inputs: ControlledInputProps[] = [
        {
            label: "Email",
            name: "email",
            value: email,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
            }
        },
        {
            label: "Username",
            name: "username",
            value: username,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value)
            }
        },
        {
            label: "Password",
            name: "password",
            value: password,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
            },
            type: "password",
        },
    ]
    
    const submitForm = () => {

    }
    
    return (
        <AuthCard
        inputs={inputs}
        onSubmit={submitForm}
        headerText="Create your Anynote account"
        buttonText="Create account"
        footerText="Already have an account?"
        footerLinkText="Sign in"
        footerLinkTo="/login"
        />
    )
}
