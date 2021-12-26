import React, { useContext, useEffect, useState } from "react";
import { MountedContext } from "../../context/MountedContext";
import { getCookie } from "../../utils";

export default function Users(props) {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState({ display: "none" });
    const [mounted, setMounted] = useContext(MountedContext);

    const handleDisplay = async type => {
        await fetch("/auth/findall", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + getCookie("jwt")
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data.result);
                setLoading({ display: "none" });
            })
            .catch(err => {
                setMessage(err);
                setLoading({ display: "none" });
            });
    }

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return () => handleDisplay(props.type);
        }
    }, [mounted])

    const _display = () => {
        return (
            <div className='overflow-auto custom-card'>
                <button className="btn btn-dark mt-4 mb-4" onClick={() => handleDisplay("student")}>
                    DISPLAY STUDENTS WITH TEACHERS
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Student</th>
                            <th scope="col">Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.username}</td>
                                        <td>{item.teacher.username}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    };

    switch (props.type) {
        case "student":
            return (
                <>
                    <br /><br />
                    <center>
                        <div className="spinner-border" role="status" style={loading}>
                            <span className="sr-only" />
                        </div>
                    </center>
                    <br />
                    {
                        message ? (
                            <div className="alert alert-dark" role="alert">
                                <b>
                                    {message}
                                </b>
                            </div>
                        ) : (<></>)
                    }
                    <br />
                    <button className="btn btn-dark" onClick={() => handleDisplay("teacher")}>
                        DISPLAY STUDENTS WITH TEACHERS
                    </button>
                </>
            );
        case "teacher":
            return (
                <>
                    <br /><br />
                    <center>
                        <div className="spinner-border" role="status" style={loading}>
                            <span className="sr-only" />
                        </div>
                    </center>
                    <br />
                    {
                        message ? (
                            <div className="alert alert-dark" role="alert">
                                <b>
                                    {message}
                                </b>
                            </div>
                        ) : (<></>)
                    }
                    {_display()}
                </>
            );
        default:
            return (
                <>
                </>
            );
    }
}