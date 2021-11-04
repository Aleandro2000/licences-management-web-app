import { useState } from "react"
import type { NextPage } from "next"
import Navbar from "../components/navbar"

const Login: NextPage = () => {

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [message,setMessage]=useState();

    const sendRequest = async () => {
        try {
            await fetch("/auth/login",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
                .then(response => response.json())
                .then(data => {
                    if(data.status === 200)
                    {
                        
                    }
                    else
                    {
                        setMessage(data.message);
                    }
                })
                .catch(err => {
                    setMessage(err);
                });
        }
        catch(err) {
            setMessage(err);
        }
    }

    const login = (event) => {
        event.preventDefault();
    }

    const input = event => type => {
        switch(type)
        {
            case "email":
                setEmail(event.target.email.value);
                break;
            case "password":
                setPassword(event.targer.password.value);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Navbar/>
            <form className="form-group" onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" onChange={input("email")} required/>
                    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={input("password")} required/>
                </div>
                <button type="submit" className="btn btn-dark" onClick={sendRequest}>LOGIN</button>
            </form>
        </>
    )
}

export default Login