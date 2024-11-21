

export function validateEmail(email: string): string {
    const isValid = !!String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    
    if (!isValid) {
        return "Invalid email"
    }

    return ""
}

export function validatePassword(password: string): string {
    if (password.length < 8) {
        return "Password should be at least 8 characters long"
    }

    if (!/\d/.test(password)) {
        return "Password should contain at least 1 number"
    }

    if (!/[A-Z]/.test(password)) {
        return "Password should contain at least 1 capital letter"
    }

    return ""
}

export function validateUsername(username: string): string {
    if (username.length < 3) {
        return "Username should be at least 3 characters long"
    }

    return ""
}