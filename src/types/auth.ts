export type RegisterResponse = {
    isSuccessful: boolean,
    responseStatusCode: number,
    responseStatusText: string,
}

export type FormErrors = {
    email?: string,
    username?: string,
    password?: string,
    form?: string,
}

export type VerificationStatus = {
    isSuccessful?: boolean,
    message?: string,
}

export type Credentials = {
    email?: string,
    username?: string,
    password?: string,
}
