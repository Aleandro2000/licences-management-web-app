import React from "react";
import Department from "./pannel_component/Department";
import Grade from "./pannel_component/Grade";
import GradesStatus from "./pannel_component/GradesStatus";
import Licence from "./pannel_component/Licence";
import University from "./pannel_component/University";
import Users from "./pannel_component/Users";

export default function Pannel(props) {
    switch (props.type) {
        case "student":
            return (
                <div className="container mt-5">
                    <University type="student" />
                    <Licence />
                    <Users />
                    <GradesStatus />
                </div>
            );
        case "teacher":
            return (
                <div className="container mt-5">
                    <Department />
                    <University type="teacher" />
                    <Users />
                    <Grade />
                    <GradesStatus />
                </div>
            );
        default:
            return (
                <>
                </>
            );
    }
}