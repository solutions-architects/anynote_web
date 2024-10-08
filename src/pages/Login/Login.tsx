import AuthCard from "../../ui/components/AuthCard/AuthCard"
import { useState } from "react"
import { 
    Props as ControlledInputProps 
} from "../../ui/components/TextInput/ControlledInput"

export default function Login() {
    const [email, setEmail] = useState("")
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
            label: "Password",
            name: "password",
            value: password,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
            },
            type: "password",
            sideLinkText: "Forgot password?",
            sideLinkTo: "/forgot-password"
        }
    ]
    
    const submitForm = () => {

    }
    
    return (
        <AuthCard
        inputs={inputs}
        onSubmit={submitForm}
        headerText="Sign in to your account"
        buttonText="Sign in"
        footerText="New to anynote?"
        footerLinkText="Create account"
        footerLinkTo="/register"
        />
    )
}
