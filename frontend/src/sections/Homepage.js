import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Homepage() {
    return (
        <div className="fadeIn">
            <Navbar />
            <center className="container fitting">
                <h1>
                    <i className="fa fa-graduation-cap" />
                    <br />
                    <b>
                        LICENCEINATORUL
                    </b>
                </h1>
                <h2>
                    Solution for licence managing.
                </h2>
                <div className="row fitting">
                    <div className="col custom-card">
                        <h3>
                            <i className="fa fa-thumbs-up" /> EASY TO USE
                        </h3>
                    </div>
                    <div className="col custom-card">
                        <h3>
                            <i className="fa fa-smile-o" /> 100% FREE
                        </h3>
                    </div>
                    <div className="col custom-card">
                        <h3>
                            <i className="fa fa-shield" /> SECURITY AND TRUST
                        </h3>
                    </div>
                </div>
            </center>
            <Footer />
        </div>
    );
}