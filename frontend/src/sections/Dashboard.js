import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Pannel from "../components/Pannel";
import { getSession } from "../utils";

export default function Dashboard() {
    return (
        <div className="fadeIn">
            <Navbar />
            <div className="container fitting">
                <h1>
                    <b>
                        {getSession().user.username}
                    </b>
                </h1>
                <br />
                <b>
                    {getSession().type.toUpperCase()} - DASHBOARD
                </b>
                <br />
                <Pannel type={getSession().type} />
            </div>
            <Footer />
        </div>
    );
}