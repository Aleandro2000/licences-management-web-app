import React, { useContext, useEffect, useState } from "react";
import { MountedContext } from "../../context/MountedContext";
import { getCookie } from "../../utils";

export default function GradesStatus() {
    const [mounted, setMounted] = useContext(MountedContext);
    const [universities, setUniversities] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            fetch('/universities/licences', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + getCookie("jwt")
                }
            })
                .then(response => response.json())
                .then(data => setUniversities(data.result))
                .catch(err => alert(err));
            fetch('/universities/students', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + getCookie("jwt")
                }
            })
                .then(response => response.json())
                .then(data => setStudents(data.result))
                .catch(err => alert(err));
        }
    }, [mounted])

    const _displayUniversities = () => {
        return (
            <div className="overflow-auto custom-card">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">University</th>
                            <th scope="col">Licence Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            universities.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{item.university.name.toUpperCase()}</td>
                                        <td>{item.title}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    const _displayStudents = () => {
        return (
            <div className="overflow-auto custom-card">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Student</th>
                            <th scope="col">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{item.student.username}</td>
                                        <td>{item.grade}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <>
            <br />
            {_displayUniversities()}
            <br />
            {_displayStudents()}
        </>
    )
}