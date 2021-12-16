import React from "react";

export default function Licence() {
    const handleSubmit = async e => {
        e.preventDefault();
    }

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
            <button type="submit" className="btn btn-dark">
                <i className="fa fa-send" /> SEND
            </button>
        </form>
    )
}