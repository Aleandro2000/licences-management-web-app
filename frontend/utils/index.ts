export function login(user: any)
{
    localStorage.setItem("session",user);
}

export function logout()
{
    localStorage.removeItem("session");
}

export function getSession()
{
    return JSON.parse(localStorage.getItem("session"));
}

export function isLogin()
{
    if(localStorage.getItem("session"))
        return true;
    else
        return false;
}