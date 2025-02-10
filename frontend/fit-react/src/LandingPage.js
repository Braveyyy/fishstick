import './LandingPage.css';

export default function LandingPage() {
    return(
        <div className="flex-container flex-column min-screen-height">
            <header className="header-container">
                <a className="brand-logo" href="#">
                    <svg className="icon">Dumbbell Icon SVG</svg>
                    <span className="brand-name">FitTrack</span>
                </a>
                <nav className="navigation">
                    <a className="nav-link" href="#">Features</a>
                    <a className="nav-link" href="#">Pricing</a>
                    <a className="nav-link" href="#">About</a>
                    <a className="nav-link" href="#">Contact</a>
                </nav>
            </header>
            <main className="main-content">
                <section className="intro-section">
                    <div className="container">
                        <div className="intro-content">
                            <div className="intro-text">
                                <h1 className="main-heading">Your Personal Fitness Journey Starts Here</h1>
                                <p className="subheading">Create, modify, and discover exercises and workouts tailored to your fitness goals.</p>
                            </div>
                            <div className="button-group">
                                <button className="primary-button">Get Started</button>
                                <button className="secondary-button">Learn More</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="features-section">
                    <div className="container">
                        <h2 className="section-heading">Key Features</h2>
                        <div className="features-grid">
                            <div className="feature-item">
                                <div className="icon-wrapper blue-background">
                                    <svg className="icon">Plus Icon SVG</svg>
                                </div>
                                <h3 className="feature-title">Create Exercises</h3>
                                <p className="feature-description">Design custom exercises that fit your unique fitness routine.</p>
                            </div>
                            <div className="feature-item">
                                <div className="icon-wrapper green-background">
                                    <svg className="icon">Edit Icon SVG</svg>
                                </div>
                                <h3 className="feature-title">Modify Workouts</h3>
                                <p className="feature-description">Easily adjust and personalize your workout plans as you progress.</p>
                            </div>
                            <div className="feature-item">
                                <div className="icon-wrapper purple-background">
                                    <svg className="icon">Search Icon SVG</svg>
                                </div>
                                <h3 className="feature-title">Discover Exercises</h3>
                                <p className="feature-description">Explore a vast library of exercises to diversify your workouts.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="signup-section">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-text">
                                <h2 className="section-heading">Start Your Fitness Journey Today</h2>
                                <p className="subheading">Join thousands of users who have transformed their lives with FitTrack.</p>
                            </div>
                            <div className="signup-form-container">
                                <form className="signup-form">
                                    <input className="email-input" placeholder="Enter your email" type="email" />
                                    <button className="primary-button" type="submit">Sign Up</button>
                                </form>
                                <p className="form-note">
                                    By signing up, you agree to our <a className="terms-link" href="#">Terms & Conditions</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="footer-container">
                <p className="footer-text">© 2023 FitTrack. All rights reserved.</p>
                <nav className="footer-nav">
                    <a className="footer-link" href="#">Terms of Service</a>
                    <a className="footer-link" href="#">Privacy</a>
                </nav>
            </footer>
        </div>
    );
}
