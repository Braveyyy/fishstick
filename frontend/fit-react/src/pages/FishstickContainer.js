import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/FishstickContainer.css';
import './MainDashboard.js'
import Dashboard from './MainDashboard.js';
import WorkoutPlans from './WorkoutPlans.js';
import Exercise from './Exercises.js';

export default function FishstickContainer() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()
    const { username } = location.state;

    const [dashboardOpen, setDashboardOpen] = useState(true)
    const [workoutsOpen, setWorkoutsOpen] = useState(false)
    const [exercisesOpen, setExercisesOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const dashboardToggle = () => {
        setDashboardOpen(true)
        setWorkoutsOpen(false)
        setExercisesOpen(false)
    }

    const workoutsToggle = () => {
        setDashboardOpen(false)
        setWorkoutsOpen(true)
        setExercisesOpen(false)
    }

    const exercisesToggle = () => {
        setDashboardOpen(false)
        setWorkoutsOpen(false)
        setExercisesOpen(true)
    }

    return (
        
        <div className='fishstick-container'>
            <button className="mobile-menu-toggle" onClick={toggleSidebar}>
                {sidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                )}
            </button>
            <aside className={`fishstick-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.5 6.5h11"></path>
                    <path d="M6.5 17.5h11"></path>
                    <path d="M6 12h.01"></path>
                    <path d="M18 12h.01"></path>
                    <path d="M8 12a1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0"></path>
                    </svg>
                    <span>Fishstick</span>
                </div>
                </div>

                <nav className="sidebar-nav">
                <ul>
                    <li className="active">
                    <button onClick={() => dashboardToggle()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span>Dashboard</span>
                    </button>
                    </li>
                    <li>
                    <button onClick={() => workoutsToggle()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6.5 6.5h11"></path>
                        <path d="M6.5 17.5h11"></path>
                        <path d="M6 12h.01"></path>
                        <path d="M18 12h.01"></path>
                        <path d="M8 12a1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0"></path>
                        </svg>
                        <span>Workouts</span>
                    </button>
                    </li>
                    <li>
                    <button onClick={() => exercisesToggle()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18"></path>
                        <path d="M7 16h2"></path>
                        <path d="M11 16h2"></path>
                        <path d="M15 16h2"></path>
                        <path d="M7 12h2"></path>
                        <path d="M11 12h2"></path>
                        <path d="M15 12h2"></path>
                        <path d="M7 8h2"></path>
                        <path d="M11 8h2"></path>
                        <path d="M15 8h2"></path>
                        </svg>
                        <span>Exercises</span>
                    </button>
                    </li>
                </ul>
                </nav>

                <div className="sidebar-footer">
                <ul>
                    <li>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <Link to={'/'} style={{ textDecoration: 'none' }}>Logout</Link>
                    </button>
                    </li>
                </ul>
                </div>
            </aside>
            <main className={`main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
                { dashboardOpen && <Dashboard currentLoggedInUser={username}></Dashboard> }
                { workoutsOpen && <WorkoutPlans></WorkoutPlans> }
                { exercisesOpen && <Exercise></Exercise> }
            </main>
        </div>
    );
}