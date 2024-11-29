import { useState, useEffect } from "react"
import { Credentials, FormErrors } from "../../types/auth"
import { useNavigate } from "react-router-dom"
import { credentialsFilled, credentialsHaveErrors, countActiveInputErrors, emailErrorMessage } from "../../utils/auth"
import { REDIRECT_IF_LOGGED_IN_URL, REDIRECT_ON_REGISTER_URL } from "../api/urls"
import { register, login } from "../api/auth"
import { ApiResponse } from "../api/auth"

const useAuthForm = (type: "login" | "register") => {
    const [credentials, setCredentials] = useState<Credentials>({})
    const [errors, setErrors] = useState<FormErrors>({})
    const [canSubmit, setCanSubmit] = useState(false)
    const [isSubmitPending, setIsSubmitPending] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async () => {
        if (!canSubmit) {
            return
        }

        setIsSubmitPending(true)
        setErrors({})

        let response: ApiResponse

        if (type === "register") {
            response = await register(
                credentials.email!, 
                credentials.username!, 
                credentials.password!
            )
        } else {
            response = await login(
                credentials.email!,
                credentials.password!
            )
        }

        setIsSubmitPending(false)

        if (response.isError && response.errorData) {
            const errors = response.errorData
            setErrors({
                email: errors.email,
                username: errors.username,
                password: errors.password,
                form: errors.detail,
            })
            return
        } 

        if (response.isError) {
            setErrors({
                form: "Unexpected error occured",
            })
            return
        }

        if (type === "register") {
            navigate(REDIRECT_ON_REGISTER_URL + `?email=${credentials.email}`, { replace: true })
        } else {
            navigate(REDIRECT_IF_LOGGED_IN_URL, { replace: true })
        }
    }

    useEffect(() => {
        let credentialsAmount = 3
        if (type === "login") {
            credentialsAmount = 2
        }

        if (!credentialsFilled(credentials, credentialsAmount)
            || emailErrorMessage(credentials.email!)
            || countActiveInputErrors(errors) > 0
            || isSubmitPending) {
            setCanSubmit(false)
            return
        }

        if (type === "register" && !credentialsHaveErrors(credentials)) {
            setCanSubmit(false)
            return
        }

        setCanSubmit(true)
    }, [credentials, errors, isSubmitPending, type])

    return { credentials, setCredentials, errors, setErrors, canSubmit, onSubmit, isSubmitPending }
}

export default useAuthForm
