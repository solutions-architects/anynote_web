import AuthCard from "../../ui/components/AuthCard/AuthCard"
import ControlledInput from "../../ui/components/TextInput/ControlledInput"
import { 
    emailErrorMessage, 
    passwordErrorMessage, 
    usernameErrorMessage, 
    countActiveInputErrors, 
} from "../../utils/auth"
import useAuthForm from "../../services/hooks/useAuthForm"

export default function Register() {
    
    const { 
        canSubmit, 
        onSubmit, 
        errors, 
        setErrors, 
        credentials, 
        setCredentials, 
        submitPending 
    } = useAuthForm("register")

    return (
        <AuthCard
        type="register"
        onSubmit={onSubmit}
        errorText={errors.form}
        errorsActive={countActiveInputErrors(errors)}
        canSubmit={canSubmit && !submitPending}
        submitPending={submitPending}
        >
            <ControlledInput 
            value={credentials.email}
            label="Email"
            type="email"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    setCredentials({...credentials, email: e.target.value})
                    setErrors({...errors, email: ""})
                }
            }
            onBlur={() => {
                if (credentials.email) {
                    const emailError = emailErrorMessage(credentials.email)
                    setErrors({...errors, email: emailError})
                }
            }}
            errorText={errors.email}
            />

            <ControlledInput 
            value={credentials.username}
            label="Username"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    setCredentials({...credentials, username: e.target.value})
                    setErrors({...errors, username: ""})
                }
            }
            onBlur={() => {
                if (credentials.username) {
                    const usernameError = usernameErrorMessage(credentials.username)
                    setErrors({...errors, username: usernameError})
                }
            }}
            errorText={errors.username}
            />

            <ControlledInput 
            value={credentials.password}
            label="Password"
            type="password"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    setCredentials({...credentials, password: e.target.value})
                    setErrors({...errors, password: ""})
                }
            }
            onBlur={() => {
                if (credentials.password) {
                    const passwordError = passwordErrorMessage(credentials.password)
                    setErrors({...errors, password: passwordError})
                }
            }}
            errorText={errors.password}
            />
        </AuthCard>
    )
}
