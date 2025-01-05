import './LandingPage.css';

export default function LandingPage() {
    return(
        <div className = "LandingPage">
            <header>
                <div className="headerDiv">
                    <a href="/" style={{fontSize:'2x1', fontWeight: 'bold', color: '#fff', textDecoration: 'none'}}>
                        Fishstick
                    </a>
                    <nav className="headerNavBar">
                        <a href="/" style={{color: '#fff', textDecoration: 'none', ':hover': {color : '#81F0E5'}}}>Link1</a>
                    </nav>
                </div>
            </header>
        </div>
    );
}