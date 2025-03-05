import "../css/SearchBar.css";
import {useState} from 'react';

export default function Exercise() {
    const [muscle, setMuscle] = useState('');
    const [exercises, setExercises] = useState([]);

    const handleSearch = async () => {
        if(!muscle) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/exercises/${muscle}`)
            .then(response => response.json())
            .then(data => setExercises(data))
        } catch (err) {
            console.error('Error Fetching Exercises: ', err);
        }
    };

    return(
        <div className="flex-container flex-column min-screen-height">

            <header className="header-container">    
                <span className="site-name">Fishstick</span>
            </header>
            <main className="main-content">
                <section className="intro-section">
                    <h1 className="main-heading">Look up an exercise by muscle</h1>
                    <div className="search-container">
                        <input type="text" placeholder="Finding..." value={muscle} onChange={(e) => setMuscle(e.target.value)}></input>
                        <button onClick={handleSearch}>Search</button>
                        <ul>
                            {exercises.length > 0 ? (
                            exercises.map((exercise) => (
                                <li key={exercise.id}>
                                <strong>{exercise.name}</strong> - {exercise.equipment}
                                </li>
                            ))
                            ) : (
                            <p>No exercises found</p>
                            )}
                        </ul>
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