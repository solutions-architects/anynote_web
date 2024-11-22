import axios, { AxiosResponse } from "axios";
import { baseUrl, registerUrl, emailVerifyUrl, loginUrl, tokenVerifyUrl, tokenRefreshUrl } from "./urls";
import { setCookie, getCookie, deleteCookie } from "../../utils/auth";

const REFRESH_TOKEN_LIFETIME_DAYS = 1

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

    console.log("Registration response: ")
    console.log(result)

    apiInstance.defaults.headers.common.Authorization = `Bearer ${result.data.access_token}`

    return result
}

export async function isValidToken() {
    const result = await apiInstance.post(tokenVerifyUrl, {
        token: getCookie("token"),
    })

    return result
}

export async function refreshToken() {
    const refresh = getCookie("refresh")
    const result = await apiInstance.post(tokenRefreshUrl, {
        refresh: refresh,
    })

    setCookie("token", result.data.access, 1)
    apiInstance.defaults.headers.common.Authorization = `Bearer ${result.data.access}`

    return result
}

export async function logout() {
    deleteCookie("token")
    deleteCookie("refresh")
    apiInstance.defaults.headers.common.Authorization = undefined
}

export async function login(username: string, password: string): Promise<AxiosResponse> {
    const result = await apiInstance.post(loginUrl, {
        username: username,
        password: password,
    })

    console.log("Login response: ")
    console.log(result)
    
    setCookie("token", result.data.access, 1)
    setCookie("refresh", result.data.refresh, REFRESH_TOKEN_LIFETIME_DAYS)
    apiInstance.defaults.headers.common.Authorization = `Bearer ${result.data.access}`

    return result
}

export async function verifyEmail(token: string): Promise<AxiosResponse> {
    const result = await apiInstance.get(emailVerifyUrl + "?token=" + token)

    return result
}