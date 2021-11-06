import { Link } from "react-router-dom";
import { isLogin } from "../utils";

export default function Navbar()
{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand"><i className="fa fa-graduation-cap"/></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto text-center">
                        <li className="nav-item" style={{cursor: "pointer"}}>
                            <Link className="nav-link" to="/home">
                                Home
                            </Link>
                        </li>
                        {
                            !isLogin() ? (
                                <>
                                    <li className="nav-item" style={{cursor: "pointer"}}>
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item" style={{cursor: "pointer"}}>
                                        <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item" style={{cursor: "pointer"}}>
                                    <Link className="nav-link" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}