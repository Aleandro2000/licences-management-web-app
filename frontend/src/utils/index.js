export function login(user)
{
    sessionStorage.setItem("session",user);
}

export function logout()
{
    sessionStorage.removeItem("session");
    document.cookie="jwt=;expires="+new Date(0).toUTCString();
}

export function isLogin()
{
    return localStorage.getItem("session")&&document.cookie.length;
}