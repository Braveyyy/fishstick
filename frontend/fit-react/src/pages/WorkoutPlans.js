import WorkoutPlanButtons from "./WorkoutPlanButtons";


export default function WorkoutPlans() {
    return(
        <>
            <main className="main-content">
                <section className="intro-section">
                    <h1 className="main-heading" style={{ marginLeft: 'var(--sidebar-width)' }}>Find Common Workout Plans</h1>
                    <WorkoutPlanButtons></WorkoutPlanButtons>
                </section>
            </main>
        </>
    );
}