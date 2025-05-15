import MuscleGroupButtons from "./MuscleGroupButtons";

export default function Exercise() {
    return(
        <>
            <main className="main-content">
                <section className="intro-section">
                    <h1 className="main-heading" style={{ marginLeft: 'var(--sidebar-width)' }}>Search for Exercises by Muscle Group</h1>
                    <MuscleGroupButtons></MuscleGroupButtons>
                </section>
            </main>'
        </>
    );
}