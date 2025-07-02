import React, { useState } from 'react';
import "../css/MuscleGroupButtons.css";

export default function MuscleGroupButtons() {
  const [exercises, setExercises] = useState([]);
  const [activeMuscle, setActiveMuscle] = useState(null);

  const handleSearch = async (muscle) => {
    setActiveMuscle(muscle);
    try {
      const response = await fetch(`${import.meta.env.FRONTEND_URL}/api/exercises/${muscle}`);
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
        <div className='muscle-group-column'>
          <h3>Upper Body</h3>
          <div className='upper-body-buttons'>
            <button className='muscleGroupButton' onClick={() => handleSearch('chest')}>Chest</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('lats')}>Lats</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('middle_back')}>Middle Back</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('lower_back')}>Lower Back</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('neck')}>Neck</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('traps')}>Traps</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('biceps')}>Biceps</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('triceps')}>Triceps</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('forearms')}>Forearms</button>
          </div>
        </div>
        <div className='muscle-group-column'>
          <h3>Lower Body</h3>
          <div className='lower-body-buttons'>
            <button className='muscleGroupButton' onClick={() => handleSearch('quadriceps')}>Quadriceps</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('hamstrings')}>Hamstrings</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('glutes')}>Glutes</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('calves')}>Calves</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('abductors')}>Abductors</button>
            <button className='muscleGroupButton' onClick={() => handleSearch('adductors')}>Adductors</button>
          </div>
          <h3>Core</h3>
          <div className='abodminal-cardio-buttons'>
            <button className='muscleGroupButton' onClick={() => handleSearch('abdominals')}>Abdominals</button>
          </div>
        </div>
      </div>
      <div className='muscles-found-div'>
        {activeMuscle && (
          <>
            <ul>
              {exercises.length > 0 ? (
                exercises.map((exercise) => (
                  <li key={exercise.id}>
                    <strong>{exercise.name}</strong>
                    equipment — {exercise.equipment} <br></br>
                    difficulty — {exercise.difficulty} <br></br>
                    instructions — {exercise.instructions}
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
