export default function login(user)
{
    sessionStorage.setItem("session",user);
}

export default function logout()
{
    sessionStorage.removeItem("session");
    document.cookie="jwt=;expires="+new Date(0).toUTCString();
}

export default function isLogin()
{
    return localStorage.getItem("session")&&document.cookie.length;
}