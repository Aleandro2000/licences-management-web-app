import React from "react";
import Licence from "./pannel_component/Licence";
import University from "./pannel_component/University";

export default function Pannel(props) {
    switch (props.type) {
        case "student":
            return (
                <div className="container mt-5">
                    <University type="student" />
                    <Licence />
                </div>
            );
        case "teacher":
            return (
                <div className="container mt-5">
                    <University type="teacher" />
                </div>
            );
        default:
            return (
                <>
                </>
            );
    }
}