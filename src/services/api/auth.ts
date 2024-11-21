import axios, { AxiosResponse } from "axios";
import { baseUrl, registerUrl, emailVerifyUrl } from "./urls";

export const apiInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
})

export async function register(email: string, username: string, password: string): Promise<AxiosResponse> {
    const result = await apiInstance.post(registerUrl, {
        username: username,
        email: email,
        password: password,
        password2: password,
    })

    return result
}

export async function verifyEmail(token: string): Promise<AxiosResponse> {
    const result = await apiInstance.get(emailVerifyUrl + "?token=" + token)

    return result
}