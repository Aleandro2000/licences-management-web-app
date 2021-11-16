import { Link,useHistory } from "react-router-dom";
import { getCookie, isLogin,logout } from "../utils";

export default function Navbar()
{
    const history=useHistory();

    const handleLogout = () => {
        logout();
        history.push("/login");
    }

    const deleteAccount = async () => {
        await fetch("/auth/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getCookie("jwt")
            }
        })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(err => alert(err.message));
        handleLogout();
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand"><i className="fa fa-graduation-cap"/></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto text-center">
                        <li className="nav-item" style={{cursor: "pointer"}}>
                            <Link className="nav-link" to="/home">
                                <i className="fa fa-home"/>|Home
                            </Link>
                        </li>
                        {
                            !isLogin() ? (
                                <>
                                    <li className="nav-item" style={{cursor: "pointer"}}>
                                        <Link className="nav-link" to="/login">
                                            <i className="fa fa-sign-in"/>|Login
                                        </Link>
                                    </li>
                                    <li className="nav-item" style={{cursor: "pointer"}}>
                                        <Link className="nav-link" to="/register">
                                            <i className="fa fa-plus"/>|Register
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item" style={{cursor: "pointer"}}>
                                        <Link className="nav-link" to="/dashboard">
                                            <i className="fa fa-dashboard"/>|Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item" style={{cursor: "pointer"}}>
                                        <button className="btn btn-light" style={{borderRadius: 0}} onClick={deleteAccount}>
                                            <i className="fa fa-minus"/>|Delete
                                        </button>
                                    </li>
                                    <li className="nav-item" style={{cursor: "pointer"}}>
                                        <button className="btn btn-light" style={{borderRadius: 0}} onClick={handleLogout}>
                                            <i className="fa fa-sign-out"/>|Logout
                                        </button>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}