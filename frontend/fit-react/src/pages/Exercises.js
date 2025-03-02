import "../css/SearchBar.css";

export default function Exercise() {
    return(
        <div className="flex-container flex-column min-screen-height">

            <header className="header-container">    
                <span className="site-name">Fishstick</span>
            </header>
            <main className="main-content">
                <section className="intro-section">
                    <h1 className="main-heading">Search for an exercise</h1>
                    <div className="search-container">
                        <form>
                            <input type="text" placeholder="Finding..." name="searchbar"></input>
                        </form>
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