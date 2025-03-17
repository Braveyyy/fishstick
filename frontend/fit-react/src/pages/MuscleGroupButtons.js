import React, { useState } from 'react';
import "../css/MuscleGroupButtons.css";

export default function MuscleGroupButtons() {
  const muscleGroups = ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'];
  const [exercises, setExercises] = useState([]);
  const [activeMuscle, setActiveMuscle] = useState(null);

  const handleSearch = async (muscle) => {
    setActiveMuscle(muscle);
    try {
      const response = await fetch(`http://localhost:8080/api/exercises/${muscle}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} ${errorText}`);
        return;
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  return (
    <div className='muscle-selector-main-content'>
      <div className='muscle-buttons-div'>
        {muscleGroups.map((muscle) => (
          <button className="muscleGroupButton" key={muscle} onClick={() => handleSearch(muscle)}>
            {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
          </button>
        ))}
      </div>
      <div className='muscles-found-div'>
        {activeMuscle && (
          <>
            <ul>
              {exercises.length > 0 ? (
                exercises.map((exercise) => (
                  <li key={exercise.id}>
                    <strong>{exercise.name}</strong> — {exercise.equipment}
                  </li>
                ))
              ) : (
                <p>No exercises found for {activeMuscle}</p>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
