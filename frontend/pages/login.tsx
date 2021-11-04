import React, { useState } from "react"
import type { NextPage } from "next"
import Head from 'next/head'
import Navbar from "../components/navbar"
import 'bootstrap/dist/css/bootstrap.css'

const Login: NextPage = () => {

    const [message, setMessage]=useState()

    const sendRequest = async (event: any) => {
        await event.preventDefault()
        await fetch("/auth/login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.status === 200)
                {
                    
                }
                else
                {
                    setMessage(data.message)
                }
            })
            .catch(err => {
                setMessage(err)
            })
    }

    return (
        <>
            <Head>
                <title>
                    Login
                </title>
            </Head>
            <Navbar/>
            <br/><br/>
            <form className="container form-group text-center" onSubmit={sendRequest}>
                <div className="form-group">
                    <input type="email" className="form-control" aria-describedby="email" placeholder="Enter email" name="email" required/>
                </div>
                <br/>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" name="password" required/>
                </div>
                <br/>
                <button type="submit" className="btn btn-dark" onClick={sendRequest}>LOGIN</button>
                <br/><br/>
                {message}
            </form>
        </>
    )
}

export default Login