import { useState } from "react"
import { useEffect } from "react"
import WorkoutPlan from "../modules/WorkoutPlan.js"
import "../css/MainDashboard.css"
const EC2_ADDRESS = "http://52.53.216.175:8080";

export default function Dashboard({currentLoggedInUser}) {
  const [workout, setWorkout] = useState(null)
  const [workoutFetched, setWorkoutFetched] = useState(false)

  const getWorkoutData = async () => {
    try{
        const response = await fetch(`${EC2_ADDRESS}/api/workouts/username/` + currentLoggedInUser, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
        const responseJSON = await response.json();
        console.log('RESPONSE JSON:', responseJSON);
        setWorkout(responseJSON);
        setWorkoutFetched(true)
    }
    catch (error) {
        console.error('!ERROR FETCHING REQUESTS:', error);
    }
  }

  useEffect(() => {
    if (currentLoggedInUser) {
      getWorkoutData();
    }
  }, [currentLoggedInUser]);
  
  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-welcome">
            <h1>Welcome back, {workout?.username || "loading..."}</h1>
            <p>Let's continue your fitness journey</p>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="current-plan-section">
            <h2 className="section-title">Current Workout Plan</h2>
            {workoutFetched && (
              <WorkoutPlan workoutDays={workout?.numworkoutdays} targetedGroup={workout?.targetedmuscle} restDays={workout?.requestedrestdays} />
            )}
            <br></br>
            <button className="workout-button">Create a New Plan</button>
          </section>
        </div>
      </main>
    </div>
  )
}