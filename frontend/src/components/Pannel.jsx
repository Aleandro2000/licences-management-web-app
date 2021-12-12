import React from "react";
import University from "./pannel_component/University";

export default function Pannel(props) {
    switch (props.type) {
        case "student":
            return (
                <div className="container mt-5">
                    <University type="student" />
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