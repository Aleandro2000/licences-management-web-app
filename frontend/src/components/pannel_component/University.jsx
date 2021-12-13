import React, { useContext } from 'react';
import { useEffect, useState } from "react";
import { UserContext } from '../../context/UserContext';
import { getCookie } from "../../utils";

export default function University(props) {
    const [user, setUser] = useContext(UserContext);

    const [university, setUniversity] = useState("");
    const [mounted, setMounted] = useState(false);
    const [universities, setUniversities] = useState([]);
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
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">University</th>
                                    </tr>
                                    {
                                        universities.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.student.username}</td>
                                                    <td>{item.name.toUpperCase()}</td>
                                                    {
                                                        user.result.id === item.student.id ? (
                                                            <td>
                                                                <button className="border border-dark btn btn-light w-100" onClick={() => handleDelete(item.id)}>
                                                                    <i className='fa fa-minus' /> DELETE
                                                                </button>
                                                            </td>
                                                        ) : (<></>)
                                                    }
                                                </tr>
                                            );
                                        })
                                    }
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
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">University</th>
                                    </tr>
                                    {
                                        universities.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.student.username}</td>
                                                    <td>{item.name.toUpperCase()}</td>
                                                    <td>
                                                        <button className="border border-dark btn btn-light w-100" onClick={() => handleDelete(item.id)}>
                                                            <i className='fa fa-minus' /> DELETE
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
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
                        <select className="form-select" defaultValue={university} onChange={handleChange} id="type" name="type">
                            <option value="">SELECT UNIVERSITY</option>
                            <option value="upb">UPB</option>
                            <option value="ase">ASE</option>
                            <option value="unibuc">UniBuc</option>
                            <option value="utcb">UTCB</option>
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
                    </>
                );
            default:
                return (
                    <>
                    </>
                );
        }
    };

    return (
        <>
            <form className="container mt-5" onSubmit={handleSubmit}>
                {_renderOption()}
            </form>
            {_displayTable(universities)}
        </>
    )
}