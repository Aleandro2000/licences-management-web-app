export function login(user, type) {
    sessionStorage.setItem("session", JSON.stringify({user: user, type: type}));
}

export function logout() {
    sessionStorage.removeItem("session");
}

export function getSession() {
    return JSON.parse(sessionStorage.getItem("session"));
}

export function isLogin() {
    return sessionStorage.getItem("session") && document.cookie.length;
}

export function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    
    for(let i = 0; i < cookieArr.length; ++i) {
        const cookiePair = cookieArr[i].split("=");
        if(name === cookiePair[0].trim())
            return decodeURIComponent(cookiePair[1]);
    }
    
    return null;
}