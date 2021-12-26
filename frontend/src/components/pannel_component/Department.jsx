import React, { useContext, useEffect, useState } from "react";
import { MountedContext } from "../../context/MountedContext";
import { UserContext } from "../../context/UserContext";
import { getCookie } from "../../utils";

export default function Department() {
    const [message, setMessage] = useState("");
    const [department, setDepartment] = useState("R&D");
    const [loading, setLoading] = useState({ display: "none" });
    const [user, setUser] = useContext(UserContext);
    const [mounted, setMounted] = useContext(MountedContext);
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            setLoading({ display: "block" });
            fetch("/department/findall", {
                headers: {
                    "Authorization": "Bearer " + getCookie("jwt"),
                    "Content-type": "application/json; charset=UTF-8"
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200)
                        setResult(data.result);
                    else
                        setMessage(data.message.message ?? data.message);
                })
                .catch(err => setMessage(err));
            setLoading({ display: "none" });
        }
    }, [mounted])

    const handleChange = e => {
        setDepartment(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading({ display: "block" });
        await fetch("/department/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + getCookie("jwt")
            },
            body: JSON.stringify({
                name: department
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
        setMounted(false);
    };

    const handleDelete = async id => {
        setLoading({ display: "block" });
        await fetch("/department/delete", {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getCookie("jwt"),
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(err => setMessage(err.message));
        setLoading({ display: "none" });
        setMounted(false);
    };

    const _display = result => {
        return (
            <div className="custom-card">
                <br /><br />
                <h2 align="left">
                    Departments
                </h2>
                <br />
                <div className="overflow-auto">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                result?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.teacher.username}</td>
                                            <td>{item.name}</td>
                                            {
                                                item.teacherId === user.result.id ? (
                                                    <td>
                                                        <button aria-label='Delete' className="border border-dark btn btn-light w-100" onClick={() => handleDelete(item.id)}>
                                                            <i className='fa fa-minus' /> DELETE
                                                        </button>
                                                    </td>
                                                ) : (<td></td>)
                                            }
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };

    return (
        <>
            <form className="form-group" onSubmit={handleSubmit}>
                <label htmlFor="type">
                    <h2>
                        <b>
                            Add Department
                        </b>
                    </h2>
                </label>
                <br /><br />
                <select aria-label='Department' className="form-select" defaultValue={department} onChange={handleChange} id="department" name="department">
                    <option aria-labelledby='None' value="">SELECT DEPARTMENT</option>
                    <option aria-labelledby='R&D' value="R&D">R&D</option>
                    <option aria-labelledby='Mentoring' value="Mentoring">Mentoring</option>
                </select>
                <br />
                <button type="submit" className="btn btn-dark">
                    ADD DEPARTMENT
                </button>
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
                            {message}
                        </div>
                    ) : (<></>)
                }
                <br />
            </form>
            {result.length ? _display(result) : <></>}
        </>
    );
}