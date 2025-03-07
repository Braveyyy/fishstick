import React, { useState } from 'react';

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
    <div style={{ padding: '20px' }}>
      <h2>Select a Muscle Group:</h2>
      <div>
        {muscleGroups.map((muscle) => (
          <button
            key={muscle}
            onClick={() => handleSearch(muscle)}
            style={{
              margin: '5px',
              padding: '10px 15px',
              backgroundColor: activeMuscle === muscle ? '#add8e6' : '#f0f0f0',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
          </button>
        ))}
      </div>
      {activeMuscle && (
        <>
          <h3>
            Exercises for {activeMuscle.charAt(0).toUpperCase() + activeMuscle.slice(1)}:
          </h3>
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
  );
}
