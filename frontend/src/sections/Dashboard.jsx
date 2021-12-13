import React, { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Pannel from "../components/Pannel";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getCookie } from "../utils";

export default function Dashboard() {
    const [user, setUser] = useContext(UserContext);

    return (
        <div className="fadeIn">
            <Navbar />
            <div className="container fitting">
                <h1>
                    <b>
                        {user.result.username}
                    </b>
                </h1>
                <br />
                <b>
                    {user.type.toUpperCase()} - DASHBOARD
                </b>
                <br />
                <Pannel type={user.type} />
            </div>
            <Footer />
        </div>
    );
}