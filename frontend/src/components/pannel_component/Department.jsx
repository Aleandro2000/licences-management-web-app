import React, { useState } from "react";

export default function Department() {
    const [message, setMessage] = useState("");
    const [department, setDepartment] = useState("R&D");
    const [loading, setLoading] = useState({ display: "none" });

    const handleChange = e => {
        setDepartment(e.target.value);
    };

    return (
        <>
            <label htmlFor="type">
                <h2>
                    <b>
                        Add Department
                    </b>
                </h2>
            </label>
            <br /><br />
            <select aria-label='Department' className="form-select" defaultValue={department} onChange={handleChange} id="type" name="type">
                <option aria-labelledby='None' value="">SELECT DEPARTMENT</option>
                <option aria-labelledby='UPB' value="upb">R&D</option>
                <option aria-labelledby='ASE' value="ase">Mentoring</option>
            </select>
            <br />
            <button type="submit" className="btn btn-dark">
                ADD DEPARTMENT
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
}