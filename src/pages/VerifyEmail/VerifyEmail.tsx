import { useEffect, useState } from "react";
import "./verify-email.scss"
import { useSearchParams, useNavigate } from "react-router-dom"
import { verifyEmail } from "../../services/api/auth";
import { isAxiosError } from "axios";
import Button from "../../ui/components/Button/Button";
import { VerificationStatus } from "../../types/auth";
import { loggedInRedirectUrl } from "../../services/api/urls";


export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({});
    const token = searchParams.get("token")

    useEffect(() => {
        if (!token) {
            return
        }

        const verify = async () => {
            try {
                await verifyEmail(token)
                setVerificationStatus({
                    isSuccessful: true,
                    message: "Email verified"
                })
            } catch (err) {
                if (isAxiosError(err) && err.response?.data.error) {
                    setVerificationStatus({
                        isSuccessful: false,
                        message: err.response.data.error,
                    })
                    return
                } 

                setVerificationStatus({
                    isSuccessful: false,
                    message: "Unknown verification error",
                })
                console.error(err)
            }
        }

        verify()
    }, [token])

    return (
        <div className="verify-email">
            <div className="verify-email__main-container">
                <div className={`verify-email__message ${verificationStatus.isSuccessful ? "" : "verify-email__message--error"}`}>
                    { verificationStatus.message }
                </div>
                <div className="verify-email__button">
                    {
                        verificationStatus.isSuccessful ? (
                            <Button 
                            onClick={() => {
                                navigate("/login", { replace: true })
                            }}
                            >
                                Login
                            </Button>
                        ) : (
                            <Button 
                            onClick={() => {
                                navigate("/register", { replace: true })
                            }}
                            >
                                Register
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
