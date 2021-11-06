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
                        <Link href="/" passHref={true}>
                            <li className="nav-item nav-link" style={{cursor: "pointer"}}>
                                Home
                            </li>
                        </Link>
                        {
                            !isLogin() ? (
                                <>
                                    <Link href="/login" passHref={true}>
                                        <li className="nav-item nav-link" style={{cursor: "pointer"}}>
                                            Login
                                        </li>
                                    </Link>
                                    <Link href="/login" passHref={true}>
                                        <li className="nav-item nav-link" style={{cursor: "pointer"}}>
                                            Register
                                        </li>
                                    </Link>
                                </>
                            ) : (
                              <Link href="/dashboard" passHref={true}>
                                    <li className="nav-item nav-link" style={{cursor: "pointer"}}>
                                        Dashboard
                                    </li>
                              </Link>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}