import '../css/LandingPage.css';
import { Outlet, Link } from 'react-router-dom';

export default function LandingPage() {
    primaryButtonClick = () => {
        <Link to="/workoutPlans"></Link>
    }
    return(
        <div className="flex-container flex-column min-screen-height">
            <header className="header-container">    
                <span className="site-name">Fishstick</span>
            </header>

            <main className="main-content">
                <section className="intro-section">
                    <div className="container">
                        <div className="intro-content">
                            <div className="intro-text">
                                <h1 className="main-heading">Track, look-up, and evaluate your workouts</h1>
                                <p className="subheading">Search by specific muscle groups & find workout plans that actually work</p>
                            </div>
                            <div className="button-group">
                                <button className="primary-button">Find Workout Plans</button>
                                <button className="secondary-button">Target Specific Muscle Groups</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer-container">
                <p className="footer-text">Created by Adam Aouaj</p>
                <nav className="footer-nav">
                    <a className="footer-link" href="https://github.com/Braveyyy">GitHub</a>
                    <a className="footer-link" href="mailto:adamaouaj01@gmail.com">Contact</a>
                </nav>
            </footer>
        </div>
    );
}
