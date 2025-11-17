import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const navigate = useNavigate();

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-container">
                    <div className="logo">
                        <h2>OuterMiles</h2>
                    </div>

                    <ul className="nav-menu">
                        <li><a href="#features" className="nav-link">Features</a></li>
                        <li><a href="#how-it-works" className="nav-link">How it Works</a></li>
                        <li><a href="#featured-trips" className="nav-link">Featured Trips</a></li>
                    </ul>

                    <div className="nav-actions">

                        {/* LOGIN BUTTON → OPEN SIGNUP/LOGIN PAGE */}
                        <button
                            onClick={() => navigate("/signup")}
                            className="btn btn-primary"
                        >
                            Login
                        </button>

                        {/* GET STARTED BUTTON → ALSO OPEN SIGNUP PAGE */}
                        <button
                            className="btn-secondary"
                            onClick={() => navigate("/signup")}
                        >
                            Get Started
                        </button>
                    </div>

                    <div className="hamburger">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </nav>
        </header>
    );
}
