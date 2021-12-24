import React, { useContext, useState } from "react";
import { UniversitiesContext, UserContext } from "../../context/UserContext";
import { getCookie } from "../../utils";

export default function Licence() {
    const [user, setUser] = useContext(UserContext);
    const [universities, setUniversities] = useContext(UniversitiesContext);
    const [university, setUniversity] = useState(universities[0]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState({ display: "none" });

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
                alert(JSON.stringify(data))
                setLoading({ display: "none" });
            })
            .catch(err => {
                setMessage(err);
                setLoading({ display: "none" });
            });
    }

    const handleChange = e => {
        setUniversity(e.target.value);
    };

    return (
        <>
            {
                universities.length ? (
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
                        <b>
                            {
                                message ? (
                                    <div className="alert alert-dark" role="alert">
                                        {message}
                                    </div>
                                ) : (<></>)
                            }
                        </b>
                        <br />
                    </form>
                ) : (
                    <></>
                )
            }
        </>
    );
}