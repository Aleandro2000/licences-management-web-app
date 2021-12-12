import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function NotFound() {
    return (
        <div className="fadeIn">
            <Navbar />
            <div className="container fitting">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div className="error-details">
                                <b>
                                    Sorry, an error has occured, Requested page not found! :(
                                </b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}