/*eslint-disable */
export function login(user, type) {
    sessionStorage.setItem("session", JSON.stringify({ user: user, type: type }));
}

export function deleteSession() {
    sessionStorage.removeItem("session");
}

export function logout() {
    deleteSession();
    document.cookie = "jwt=; expires=" + new Date(0);
}

export function getSession() {
    return JSON.parse(sessionStorage.getItem("session"));
}

export function isLogin() {
    return sessionStorage.getItem("session") && document.cookie.length;
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
/*eslint */