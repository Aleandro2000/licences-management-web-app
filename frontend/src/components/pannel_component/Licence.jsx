import React, { useContext, useEffect, useState } from "react";
import { MountedContext } from "../../context/MountedContext";
import { UniversitiesContext, UserContext } from "../../context/UserContext";
import { getCookie } from "../../utils";

export default function Licence() {
    const [user, setUser] = useContext(UserContext);
    const [universities, setUniversities] = useContext(UniversitiesContext);
    const [university, setUniversity] = useState(universities[0]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState({ display: "none" });
    const [licences, setLicences] = useState([]);
    const [mounted, setMounted] = useContext(MountedContext);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading({ display: "block" });
        await fetch("/licence/upload", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + getCookie("jwt")
            },
            body: JSON.stringify({
                studentId: user.result.id,
                universityId: e.target.university.value,
                title: e.target.title.value,
                content: e.target.content.value
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
    }

    const handleChange = e => {
        setUniversity(e.target.value);
    };

    const handleDisplay = async () => {
        setLoading({ display: "block" });
        await fetch('/licence/find', {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + getCookie("jwt")
            }
        })
            .then(response => response.json())
            .then(data => {
                setLicences(data.result);
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
        await fetch('/licence/delete', {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + getCookie("jwt")
            },
            body: JSON.stringify({
                id: id
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

    const _displayLicences = licences => {
        if (licences)
            return licences.map((item, index) => {
                return (
                    <div className="custom-card" key={index}>
                        <br />
                        <button className="btn btn-dark" onClick={() => handleDelete(item.id)}>
                            <i className="fa fa-minus" /> DELETE
                        </button>
                        <h4>
                            {item.title}
                        </h4>
                        <b>
                            -{item.university.name.toUpperCase()}-
                        </b>
                        <br /><br />
                        <p align="justify">
                            {item.content}
                        </p>
                        <br />
                    </div>
                );
            });
    };

    useEffect(() => {
        if (!mounted) {
            setMounted(false);
            setLoading({ display: "block" });
            setLicences([]);
            fetch('/licence/find', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + getCookie("jwt")
                }
            })
                .then(response => response.json())
                .then(data => {
                    setLicences(data.result);
                    setLoading({ display: "none" });
                })
                .catch(err => {
                    setMessage(err);
                    setLoading({ display: "none" });
                });
        }
    }, [mounted]);

    return (
        <>
            {
                universities.length ? (
                    <>
                        <form className="form-group custom-card" onSubmit={handleSubmit}>
                            <br /><br />
                            <h2 align="left">
                                Send Licences
                            </h2>
                            <br />
                            <label htmlFor="title">
                                <b>
                                    Title
                                </b>
                            </label>
                            <input type="text" className="form-control" id="title" name="title" placeholder="WRITE LICENCE TITLE HERE" required />
                            <br />
                            <label htmlFor="content">
                                <b>
                                    Send Licence
                                </b>
                            </label>
                            <br />
                            <textarea className="form-control" id="content" name="content" required />
                            <br />
                            <label htmlFor="university">
                                <b>
                                    Select Unviersity
                                </b>
                            </label>
                            <select aria-label='University' className="form-select" defaultValue={university} onChange={handleChange} id="university" name="university">
                                {
                                    universities.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>
                                                {item.name.toUpperCase()}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <br />
                            <button type="submit" className="btn btn-dark">
                                <i className="fa fa-send" /> SEND
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
                                        <b>
                                            {message}
                                        </b>
                                    </div>
                                ) : (<></>)
                            }
                            <br />
                        </form>
                        <br />
                        <button className="btn btn-dark" onClick={handleDisplay}>
                            DISPLAY LICENCES
                        </button>
                        <br /><br />
                        {_displayLicences(licences)}
                    </>
                ) : (
                    <></>
                )
            }
        </>
    );
}