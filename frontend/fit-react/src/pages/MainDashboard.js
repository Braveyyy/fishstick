import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useUser } from "../modules/UserContext.js"
import WorkoutPlan from "../modules/WorkoutPlan.js"
import "../css/MainDashboard.css"

export default function Dashboard() {
  const [workout, setWorkout] = useState(null)
  const [workoutFetched, setWorkoutFetched] = useState(false)
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
        setWorkoutFetched(true)
    }
    catch (error) {
        console.error('!ERROR FETCHING REQUESTS:', error);
    }
  }

  useEffect(() => {
    console.log("Effect triggered. currentUser:", currentUser);
    if (currentUser) {
      getWorkoutData();
    }
  }, [currentUser]);
  
  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-welcome">
            <h1>Welcome back, {workout?.username || "Loading..."}</h1>
            <p>Let's continue your fitness journey</p>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="current-plan-section">
            <h2 className="section-title">Current Workout Plan</h2>
            {workoutFetched && (
              <WorkoutPlan workoutDays={workout?.numworkoutdays} targetedGroup={workout?.targetedmuscle} restDays={workout?.requestedrestdays} />
            )}
          </section>
        </div>
      </main>
    </div>
  )
}