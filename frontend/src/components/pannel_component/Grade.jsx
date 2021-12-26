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
    const [grade, setGrade] = useState();
    const [university, setUniversity] = useState();

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

    const handleChange = e => type => {
        switch (type) {
            case "grade":
                setGrade(e.target.value);
                break;
            case "university":
                setUniversity(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleMark = async studentId => {
        await fetch("/diploma/upload", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + getCookie("jwt")
            },
            body: JSON.stringify({
                grade: grade,
                studentId: studentId,
                universityId: university
            })
        })
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
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
                            <th scope="col">University</th>
                            <th scope="col">Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.username}</td>
                                        <td>
                                            {
                                                item.university.length ? (
                                                    <select aria-label='University' className="form-select" onChange={handleChange("university")} id="type" name="type">
                                                        <option aria-labelledby="SHOW&SELECT" value="">SHOW&amp;SELECT</option>
                                                        {
                                                            item.university.map((item, index) => {
                                                                return <option key={index} aria-labelledby={item.name.toUpperCase()} value={item.id}>{item.name.toUpperCase()}</option>;
                                                            })
                                                        }
                                                    </select>
                                                ) : (
                                                    <>
                                                        NONE
                                                    </>
                                                )
                                            }
                                        </td>
                                        <td>{item.teacher.username}</td>
                                        {
                                            item.teacher.id === user.result.id ? (
                                                <>
                                                    <td>
                                                        <input className="form-control" type="number" name="grade" min="0" max="10" step="0.01" onChange={handleChange("grade")} placeholder="Grade" required />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-dark w-100" onClick={() => handleMark(item.id)}>
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
                                                <>
                                                    <td />
                                                    <td />
                                                    <td />
                                                </>
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