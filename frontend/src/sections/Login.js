import { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Login()
{
    const [message,setMessage]=useState();
    const history=useHistory();

    const login = async (event) => {
        event.preventDefault();
        document.getElementById("loading").style.display="block";
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
                    login(data.result);
                    history.push("/dashboard");
                }
                else
                    setMessage(data.message);
            })
            .catch(err => setMessage(err.message));
        document.getElementById("loading").style.display="none";
    }

    return(
        <div className="fadeIn">
            <Navbar/>
            <br/>
            <form className="container fitting" onSubmit={login}>
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">EMAIL</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" name="email" required/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">PASSWORD</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" name="password" required/>
                    </div>
                </div>
                <br/>
                <button type="submit" className="btn btn-dark">
                    <i className="fa fa-sign-in"/> LOGIN
                </button>
                <br/><br/>
                <b>
                    {message}
                </b>
                <br/><br/>
                <center>
                    <div className="spinner-border loading" role="status" id="loading">
                      <span className="sr-only"/>
                    </div>
                </center>
            </form>
            <Footer/>
        </div>
    );
}