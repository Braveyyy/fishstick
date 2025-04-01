import "../css/SearchBar.css";
import MuscleGroupButtons from "./MuscleGroupButtons";

export default function Exercise() {
    return(
        <>
            <header className="header-container">    
                <span className="site-name">Fishstick</span>
            </header>
            <main className="main-content">
                <section className="intro-section">
                    <div className="search-container">
                        <MuscleGroupButtons></MuscleGroupButtons>
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
        </>
    );
}