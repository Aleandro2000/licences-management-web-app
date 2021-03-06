import React, { useContext } from 'react';
import { useEffect, useState } from "react";
import { MountedContext } from '../../context/MountedContext';
import { UniversitiesContext, UserContext } from '../../context/UserContext';
import { getCookie } from "../../utils";

export default function University(props) {
    const [user, setUser] = useContext(UserContext);
    const [universities, setUniversities] = useContext(UniversitiesContext);

    const [university, setUniversity] = useState("");
    const [mounted, setMounted] = useContext(MountedContext);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState({ display: "none" });

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            setLoading({ display: "block" });
            fetch("/universities/findall", {
                headers: {
                    "Authorization": "Bearer " + getCookie("jwt"),
                    "Content-type": "application/json; charset=UTF-8"
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200)
                        setUniversities(data.result);
                    else
                        setMessage(data.message.message ?? data.message);
                })
                .catch(err => setMessage(err));
            setLoading({ display: "none" });
        }
    }, [mounted]);

    const handleDelete = async id => {
        setLoading({ display: "block" });
        await fetch("/universities/delete", {
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

    const handleAdd = async id => {
        await fetch("/auth/addstudent", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + getCookie("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(err => setMessage(err));
        setMounted(false);
    };

    const handleRemove = async id => {
        await fetch("/auth/removestudent", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + getCookie("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(err => setMessage(err));
        setMounted(false);
    };

    const _displayTable = universities => {
        if (universities.length)
            switch (props.type) {
                case "student":
                    return (
                        <>
                            <br /><br /><br />
                            <h2 align="left">
                                University Students
                            </h2>
                            <br />
                            <div className='overflow-auto'>
                                <table className="table text-center overflow-auto">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">University</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            universities.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th>{index + 1}</th>
                                                        <td>{item.student.username}</td>
                                                        <td>{item.name.toUpperCase()}</td>
                                                        {
                                                            user.result.id === item.student.id ? (
                                                                <td>
                                                                    <button className="border border-dark btn btn-light w-100" onClick={() => handleDelete(item.id)}>
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
                        </>
                    );
                case "teacher":
                    return (
                        <>
                            <br /><br /><br />
                            <h2 align="left">
                                University Students
                            </h2>
                            <br />
                            <div className="overflow-auto">
                                <table className="table text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">University</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            universities.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th>{index + 1}</th>
                                                        <td>{item.student.username}</td>
                                                        <td>{item.name.toUpperCase()}</td>
                                                        {
                                                            !item.student.teacherId ? (
                                                                <td>
                                                                    <button aria-label='Delete' className="border border-dark btn btn-light w-100" onClick={() => handleAdd(item.student.id)}>
                                                                        <i className='fa fa-plus' /> ADD
                                                                    </button>
                                                                </td>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        item.student.teacherId === user.result.id ? (
                                                                            <td>
                                                                                <button aria-label='Delete' className="border border-dark btn btn-light w-100" onClick={() => handleRemove(item.student.id)}>
                                                                                    <i className='fa fa-minus' /> REMOVE
                                                                                </button>
                                                                            </td>
                                                                        ) : (<td></td>)
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                        <td>
                                                            <button aria-label='Delete' className="border border-dark btn btn-light w-100" onClick={() => handleDelete(item.id)}>
                                                                <i className='fa fa-minus' /> DELETE
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                default:
                    return (
                        <>
                        </>
                    )
            }
    };

    const handleChange = e => {
        setUniversity(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading({ display: "block" });
        await fetch("/universities/create", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getCookie("jwt"),
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                name: university,
            }),
        })
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(err => setMessage(err));
        setLoading({ display: "none" });
        setMounted(false);
    };

    const _renderOption = () => {
        switch (props.type) {
            case "student":
                return (
                    <>
                        <label htmlFor="type">
                            <h2>
                                <b>
                                    Add Unviersity
                                </b>
                            </h2>
                        </label>
                        <br /><br />
                        <select aria-label='University' className="form-select" defaultValue={university} onChange={handleChange} id="type" name="type">
                            <option aria-labelledby='None' value="">SELECT UNIVERSITY</option>
                            <option aria-labelledby='UPB' value="upb">UPB</option>
                            <option aria-labelledby='ASE' value="ase">ASE</option>
                            <option aria-labelledby='UniBuc' value="unibuc">UniBuc</option>
                            <option aria-labelledby='UTCB' value="utcb">UTCB</option>
                        </select>
                        <br />
                        <button type="submit" className="btn btn-dark">
                            ADD UNIVERSITY
                        </button>
                        <br />
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
                    </>
                );
            case "teacher":
                return (
                    <>
                        <br />
                        {
                            message ? (
                                <div className="alert alert-dark" role="alert">
                                    {message}
                                </div>
                            ) : (<></>)
                        }
                    </>
                )
            default:
                return (
                    <>
                    </>
                );
        }
    };

    return (
        <>
            <form className="form-group container" onSubmit={handleSubmit}>
                {_renderOption()}
            </form>
            {
                universities.length ? (
                    <div className="custom-card">
                        {_displayTable(universities)}
                    </div>
                ) : (
                    <></>
                )
            }
            <br />
        </>
    )
}