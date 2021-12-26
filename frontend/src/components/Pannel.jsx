import React from "react";
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
                    <Users type="student" />
                </div>
            );
        case "teacher":
            return (
                <div className="container mt-5">
                    <University type="teacher" />
                    <Users type="teacher" />
                </div>
            );
        default:
            return (
                <>
                </>
            );
    }
}