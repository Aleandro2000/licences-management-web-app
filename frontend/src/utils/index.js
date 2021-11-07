export function login(user)
{
    sessionStorage.setItem("session",JSON.stringify(user));
}

export function logout()
{
    sessionStorage.removeItem("session");
    document.cookie="jwt=;expires="+new Date(0).toUTCString();
}

export function getSession()
{
    return JSON.parse(sessionStorage.getItem("session"));
}

export function isLogin()
{
    return sessionStorage.getItem("session")&&document.cookie.length;
}