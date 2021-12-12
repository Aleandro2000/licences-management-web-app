import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Register() {
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState({ display: "none" });

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading({ display: "block" });
        await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
                type: event.target.type.value
            })
        })
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(err => setMessage(err.message));
        setLoading({ display: "none" });
    }

    return (
        <div className="fadeIn">
            <Navbar />
            <br />
            <form className="container fitting" onSubmit={handleRegister}>
                <h1>
                    <b>
                        REGISTER
                    </b>
                </h1>
                <br />
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-2 col-form-label">USERNAME</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="username" name="username" required />
                    </div>
                </div>
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
                <select className="form-select" name="type">
                    <option defaultValue="">SELECT USER TYPE</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <br />
                <button type="submit" className="btn btn-dark">
                    <i className="fa fa-plus" /> REGISTER
                </button>
                <br /><br />
                <b>
                    {message}
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