import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { baseUrl, registerUrl } from "./constants";

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
