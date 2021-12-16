import React, { useContext, useState } from "react";
import { UniversitiesContext } from "../../context/UserContext";

export default function Licence() {
    const [universities, setUniversities] = useContext(UniversitiesContext);
    const [university, setUniversity] = useState(universities[0]);

    const handleSubmit = async e => {
        e.preventDefault();
    }

    const handleChange = e => {
        setUniversity(e.target.value);
    };

    return (
        <form className="form-group custom-card" onSubmit={handleSubmit}>
            <br />
            <label htmlFor="title">
                <b>
                    Title
                </b>
            </label>
            <input type="text" className="form-control" id="title" placeholder="WRITE LICENCE TITLE HERE" />
            <br />
            <label htmlFor="licence">
                <b>
                    Send Licence
                </b>
            </label>
            <br />
            <textarea className="form-control" id="licnece" />
            <br />
            {
                universities.length ? (
                    <>
                        <label htmlFor="type">
                            <b>
                                Select Unviersity
                            </b>
                        </label>
                        <select aria-label='University' className="form-select" defaultValue={university} onChange={handleChange} id="type" name="type">
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
                    </>
                ) : (
                    <></>
                )
            }
            <br />
            <button type="submit" className="btn btn-dark">
                <i className="fa fa-send" /> SEND
            </button>
        </form>
    )
}