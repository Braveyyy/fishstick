"use client"

import { useState } from "react"
import "../css/MuscleGroupButtons.css"

// Organized muscle groups by category
const muscleGroups = {
  "Upper Body": ["chest", "lats", "middle_back", "lower_back", "neck", "traps", "biceps", "triceps", "forearms"],
  "Lower Body": ["quadriceps", "hamstrings", "glutes", "calves", "abductors", "adductors"],
  Core: ["abdominals"],
}

export default function MuscleGroupSearch() {
  const [exercises, setExercises] = useState([])
  const [activeMuscle, setActiveMuscle] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = async (muscle) => {
    setActiveMuscle(muscle)
    try {
      const response = await fetch(`http://localhost:8080/api/exercises/${muscle}`)
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Error: ${response.status} ${errorText}`)
        return
      }
      const data = await response.json()
      setExercises(data)
    } catch (error) {
      console.error("Error fetching exercises:", error)
    }
  }

  // Filter muscle groups based on search term
  const getFilteredMuscleGroups = () => {
    return Object.entries(muscleGroups).reduce((acc, [category, muscles]) => {
      const filteredMuscles = muscles.filter((muscle) => muscle.toLowerCase().includes(searchTerm.toLowerCase()))
      if (filteredMuscles.length > 0) {
        acc[category] = filteredMuscles
      }
      return acc
    }, {})
  }

  const filteredMuscleGroups = getFilteredMuscleGroups()

  return (
    <div className="muscle-selector-main-content">
      <h1 className="muscle-search-title">Exercise Search by Muscle Group</h1>

      {/* Search input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search muscle groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="muscle-search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <div className="muscle-search-layout">
        {/* Muscle groups section */}
        <div className="muscle-buttons-div">
          {Object.entries(filteredMuscleGroups).map(([category, muscles]) => (
            <div key={category} className="muscle-group-column">
              <h3>{category}</h3>
              <div className={`${category.toLowerCase().replace(" ", "-")}-buttons`}>
                {muscles.map((muscle) => (
                  <button
                    key={muscle}
                    className={`muscleGroupButton ${activeMuscle === muscle ? "active" : ""}`}
                    onClick={() => handleSearch(muscle)}
                  >
                    {muscle.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Exercise results section */}
        <div className="muscles-found-div">
          {activeMuscle ? (
            <div className="exercise-results">
              <h3>Exercises for {activeMuscle.replace("_", " ")}</h3>
              {exercises.length > 0 ? (
                <ul className="exercise-list">
                  {exercises.map((exercise) => (
                    <li key={exercise.id} className="exercise-item">
                      <strong>{exercise.name}</strong> — {exercise.equipment}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No exercises found for {activeMuscle}</p>
              )}
            </div>
          ) : (
            <p>Please select a muscle group to see exercises</p>
          )}
        </div>
      </div>
    </div>
  )
}

