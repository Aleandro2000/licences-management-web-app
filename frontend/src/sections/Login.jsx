import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { login } from "../utils";

export default function Login() {
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState({display: "none"});
    const history = useHistory();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading({display: "block"});
        const type = event.target.type.value;
        await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value,
                type: type
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    login(data.result, type);
                    setLoading({display: "none"});
                    history.push("/dashboard");
                }
                else {
                    setLoading({display: "none"});
                    setMessage(data.message);
                }
            })
            .catch(err => {
                setLoading({display: "none"});
                setMessage(err.message)}
            );
    }

    return (
        <div className="fadeIn">
            <Navbar />
            <br />
            <form className="container fitting" onSubmit={handleLogin}>
                <h1>
                    <b>
                        LOGIN
                    </b>
                </h1>
                <br />
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">EMAIL</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" name="email" required />
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">PASSWORD</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" name="password" required />
                    </div>
                </div>
                <br />
                <select className="form-select" id="type" name="type">
                    <option defaultValue="">SELECT USER TYPE</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <br />
                <button type="submit" className="btn btn-dark">
                    <i className="fa fa-sign-in" /> LOGIN
                </button>
                <br /><br />
                <b>
                    {
                        message ? (
                            <div className="alert alert-dark" role="alert">
                                {message}
                            </div>
                        ) : (<></>)
                    }
                </b>
                <br /><br />
                <center>
                    <div className="spinner-border" role="status" style={loading}>
                        <span className="sr-only" />
                    </div>
                </center>
            </form>
            <Footer />
        </div>
    );
}