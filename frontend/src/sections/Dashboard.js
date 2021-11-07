import Navbar from "../components/Navbar";
import { getSession } from "../utils";

export default function Dashboard()
{
    return(
        <div className="fadeIn">
            <Navbar/>
            <div className="container fitting">
                <h1>
                    <b>
                        {getSession().username}
                    </b>
                </h1>
                <b>
                    -DASHBOARD-
                </b>
            </div>
        </div>
    );
}