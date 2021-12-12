import React from 'react';
import { useEffect, useState } from "react";
import { getCookie } from "../../utils";

/*global fetch, alert*/
/*eslint no-undef: "error"*/

export default function University() {
    const [university, setUniversity] = useState("");
    const [mounted, setMounted] = useState(false);
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
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
                        alert(data.message.message ?? data.message);
                })
                .catch(err => alert(err));
        }
    }, [mounted]);

    const _displayTable = universities => {
        if (universities.length)
            return (
                <>
                    <br /><br /><br />
                    <h2 align="left">
                        All Students
                    </h2>
                    <br/>
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
                                    </tr>
                                );
                            })
                        }
                    </table>
                </>
            );
    };

    const handleChange = e => {
        setUniversity(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
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
            .then(data => alert(data.message))
            .catch(err => alert(err));
        setMounted(true);
    };

    return (
        <form className="container mt-5" onSubmit={handleSubmit}>
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
            {_displayTable(universities)}
        </form>
    )
}