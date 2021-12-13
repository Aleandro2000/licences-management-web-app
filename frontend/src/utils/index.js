export function logout() {
    document.cookie = "jwt=; expires=" + new Date(0);
}

export function getCookie(name) {
    const cookieArr = document.cookie.split(";");

    for (let element of cookieArr) {
        const cookiePair = element.split("=");
        if (name === cookiePair[0].trim())
            return decodeURIComponent(cookiePair[1]);
    }

    return null;
}