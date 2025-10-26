import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Replace this demo user with real auth result
        const demoUser = {
            id: 'user-1',
            name: 'Demo User',
            username: 'demo_user',
            trips: []
        };
        localStorage.setItem('loggedInUser', JSON.stringify(demoUser));
        // redirect to React route /dashboard
        navigate('/dashboard');
    };

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
                        <button onClick={handleLogin} className="btn btn-primary">Login</button>
                        <button className="btn-secondary" onClick={() => window.location.href = "login.html"}>Get Started</button>
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