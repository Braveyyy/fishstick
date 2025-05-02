import { useState } from "react"
import { useEffect } from "react"
import WorkoutPlan from "../modules/WorkoutPlan.js"
import "../css/MainDashboard.css"
import { useUser } from "../modules/UserContext.js"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [workout, setWorkout] = useState(null)
  const { currentUser } = useUser()
  const { setCurrentUser } = useUser()

  const getWorkoutData = async () => {
    console.log('CURRENT USER:', currentUser.username)
    try{
        const response = await fetch("http://localhost:8080/api/workouts/username/" + currentUser.username, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
        const responseJSON = await response.json();
        console.log('RESPONSE JSON:', responseJSON);
        setWorkout(responseJSON);
    }
    catch (error) {
        console.error('!ERROR FETCHING REQUESTS:', error);
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const printTests = () => {
    setCurrentUser("TEST")
    console.log("CURRENT USER", currentUser);
  }
  useEffect(() => {
    console.log("Effect triggered. currentUser:", currentUser);
    if (currentUser) {
      getWorkoutData();
    }
  }, [currentUser]);
  
  return (
    <div className="dashboard-container">
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

      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
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
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 6.5h11"></path>
                  <path d="M6.5 17.5h11"></path>
                  <path d="M6 12h.01"></path>
                  <path d="M18 12h.01"></path>
                  <path d="M8 12a1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0"></path>
                </svg>
                <span>Workouts</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Schedule</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
                <span>Progress</span>
              </a>
            </li>
            <li>
              <a href="#">
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
                <span>Statistics</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <ul>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-welcome">
            <h1>Welcome back, {workout?.username || "Loading..."}</h1>
            <p>Let's continue your fitness journey</p>
            <button onClick={printTests} className="sidebar-toggle">Test</button>
          </div>
          <div className="user-profile">
            <div className="user-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="current-plan-section">
            <h2 className="section-title">Current Workout Plan</h2>
          </section>
        </div>
      </main>
    </div>
  )
}

//            <WorkoutPlan workoutDays={workout?.numworkoutdays} targetedGroup={workout?.targetedmuscle} restDays={workout?.requestedrestdays} />