import axios, { AxiosResponse, isAxiosError } from "axios"
import { BASE_URL, REGISTER_URL, EMAIL_VERIFY_URL, LOGIN_URL, TOKEN_VERIFY_URL, TOKEN_REFRESH_URL } from "./urls"
import { setCookie, getCookie, deleteCookie } from "../../utils/auth"

const REFRESH_TOKEN_LIFETIME_DAYS = 1

type ErrorData = {
    email?: string,
    username?: string,
    password?: string,
    detail?: string,
}

export type ApiResponse = {
    response?: AxiosResponse,
    isError: boolean,
    errorData?: ErrorData,
}

export const apiInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

export async function register(email: string, username: string, password: string): Promise<ApiResponse> {
    try {
        const result = await apiInstance.post(REGISTER_URL, {
            username: username,
            email: email,
            password: password,
            password2: password,
        })
    
        apiInstance.defaults.headers.common.Authorization = `Bearer ${result.data.access}`

        return apiResponseFromSuccess(result)
    } catch (err) {
        return apiResponseFromError(err)
    }
}

export async function validateToken(): Promise<ApiResponse> {
    try {
        const result = await apiInstance.post(TOKEN_VERIFY_URL, {
            token: getCookie("token"),
        })

        return apiResponseFromSuccess(result)
    } catch (err) {
        return apiResponseFromError(err)
    }
}

export async function refreshToken(): Promise<ApiResponse> {
    try {
        const refresh = getCookie("refresh")
        const result = await apiInstance.post(TOKEN_REFRESH_URL, {
            refresh: refresh,
        })

        setCookie("token", result.data.access, 1)
        apiInstance.defaults.headers.common.Authorization = `Bearer ${result.data.access}`

        return apiResponseFromSuccess(result)
    } catch (err) {
        return apiResponseFromError(err)
    }

}

export function logout() {
    deleteCookie("token")
    deleteCookie("refresh")
    apiInstance.defaults.headers.common.Authorization = undefined
}

export async function login(email: string, password: string): Promise<ApiResponse> {
    try {
        const result = await apiInstance.post(LOGIN_URL, {
            email: email,
            password: password,
        })

        setCookie("token", result.data.access, 1)
        setCookie("refresh", result.data.refresh, REFRESH_TOKEN_LIFETIME_DAYS)
        apiInstance.defaults.headers.common.Authorization = `Bearer ${result.data.access}`
        
        return apiResponseFromSuccess(result)
    } catch (err) {
        return apiResponseFromError(err)
    }
}

export async function verifyEmail(token: string): Promise<ApiResponse> {
    try {
        const result = await apiInstance.get(EMAIL_VERIFY_URL + "?token=" + token)
        return apiResponseFromSuccess(result)
    } catch (err) {
        return apiResponseFromError(err)
    }
}

function apiResponseFromError(err: unknown): ApiResponse {
    if (isAxiosError(err) && err.response) {
        return {
            isError: true,
            errorData: err.response.data,
        }
    }

    return {
        isError: true
    }
}

function apiResponseFromSuccess(result: AxiosResponse): ApiResponse {
    return {
        isError: false,
        response: result,
    }
}