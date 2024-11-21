export type registerResponse = {
    isSuccessful: boolean,
    responseStatusCode: number,
    responseStatusText: string,
}

export type formErrors = {
    email?: string,
    username?: string,
    password?: string,
    form?: string,
}