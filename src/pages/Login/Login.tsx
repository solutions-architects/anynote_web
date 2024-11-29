import AuthCard from "../../ui/components/AuthCard/AuthCard"
import ControlledInput from "../../ui/components/TextInput/ControlledInput"
import { 
    emailErrorMessage, 
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
    } = useAuthForm("login")

    return (
        <AuthCard
        type="login"
        onSubmit={onSubmit}
        errorText={errors.form}
        errorsActive={countActiveInputErrors(errors)}
        canSubmit={canSubmit}
        submitPending={submitPending}
        >
            <ControlledInput 
            value={credentials.email}
            label="Email"
            type="email"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    setCredentials({...credentials, email: e.target.value})
                    setErrors({...errors, email: "", form: ""})
                }
            }
            onBlur={() => {
                if (credentials.email) {
                    const emailError = emailErrorMessage(credentials.email)
                    setErrors({...errors, email: emailError, form: ""})
                }
            }}
            errorText={errors.email}
            />

            <ControlledInput 
            value={credentials.password}
            label="Password"
            type="password"
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    setCredentials({...credentials, password: e.target.value})
                    setErrors({...errors, password: "", form: ""})
                }
            }
            errorText={errors.password}
            />
        </AuthCard>
    )
}
