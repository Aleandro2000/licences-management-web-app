import React, { useContext, useEffect, useState } from "react";
import { MountedContext } from "../../context/MountedContext";
import { UserContext } from "../../context/UserContext";
import { getCookie } from "../../utils";

export default function Grade() {
    const [user, setUser] = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState({ display: "none" });
    const [mounted, setMounted] = useContext(MountedContext);
    const [mark, setMark] = useState();

    const handleDisplay = async () => {
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

    const handleChange = e => {
        setMark(e.target.value);
    }

    const handleMark = async () => {
        await fetch("/diploma/grade", {
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
    };

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return () => handleDisplay();
        }
    }, [mounted])

    const _display = () => {
        return (
            <div className='overflow-auto custom-card'>
                <button className="btn btn-dark mt-4 mb-4" onClick={() => handleDisplay("student")}>
                    DISPLAY GRADES
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Student</th>
                            <th scope="col">Teacher</th>
                            <th scope="col">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.username}</td>
                                        <td>{item.teacher.username}</td>
                                        {
                                            item.teacher.id === user.result.id ? (
                                                <>
                                                    <td>
                                                        <input className="form-control" type="number" name="grade" min="0" max="10" step="0.01" onChange={handleChange} placeholder="Grade" required />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-dark w-100">
                                                            MARK
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-dark w-100">
                                                            DISPLAY
                                                        </button>
                                                    </td>
                                                </>
                                            ) : (
                                                <><td /><td /><td /></>
                                            )
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    };

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
}