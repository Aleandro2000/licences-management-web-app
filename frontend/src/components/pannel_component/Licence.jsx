import React from "react";

export default function Licence() {
    const handleSubmit = async e => {
        e.prevendDefault();
    }

    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <br />
            <label htmlFor="licence">
                <b>
                    Send Licence
                </b>
            </label>
            <br /><br />
            <textarea className="form-control" id="licnece" />
            <br />
            <button type="submit" className="btn btn-dark">
                <i className="fa fa-send" /> SEND
            </button>
        </form>
    )
}