import React from "react";
import { Link, useHistory } from "react-router-dom";
import { getCookie, isLogin, logout, deleteSession } from "../utils";

/*global fetch, alert*/
/*eslint no-undef: "error"*/

export default function Navbar() {
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push("/login");
    }

    const handleRemoveSession = () => {
        deleteSession();
        history.push("/login");
    }

    const deleteAccount = async () => {
        handleRemoveSession();
        return await fetch("/auth/delete", {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getCookie("jwt"),
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(err => alert(err.message));
    }

    return (
        <nav role="navigation" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand"><i className="fa fa-graduation-cap" /></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto text-center">
                        <li className="nav-item" style={{ cursor: "pointer" }}>
                            <Link aria-label="Home Section" className="nav-link" to="/home">
                                <i className="fa fa-home" />|Home
                            </Link>
                        </li>
                        {
                            !isLogin() ? (
                                <>
                                    <li className="nav-item" style={{ cursor: "pointer" }}>
                                        <Link aria-label="Login Section" className="nav-link" to="/login">
                                            <i className="fa fa-sign-in" />|Login
                                        </Link>
                                    </li>
                                    <li className="nav-item" style={{ cursor: "pointer" }}>
                                        <Link aria-label="Register Section" className="nav-link" to="/register">
                                            <i className="fa fa-plus" />|Register
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item" style={{ cursor: "pointer" }}>
                                        <Link aria-label="Dashboard Section" className="nav-link" to="/dashboard">
                                            <i className="fa fa-dashboard" />|Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item" style={{ cursor: "pointer" }}>
                                        <button className="btn btn-light w-100" style={{ borderRadius: 0 }} onClick={deleteAccount}>
                                            <i className="fa fa-minus" />|Delete
                                        </button>
                                    </li>
                                    <li aria-label="Logout Section" className="nav-item" style={{ cursor: "pointer" }}>
                                        <button className="btn btn-light w-100" style={{ borderRadius: 0 }} onClick={handleLogout}>
                                            <i className="fa fa-sign-out" />|Logout
                                        </button>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}