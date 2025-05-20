import React, { useState } from 'react';
import "../css/MuscleGroupButtons.css";

export default function WorkoutPlanButtons() {
  const workoutCategories = [
    { category: 'Push Pull Legs', value: 'Push Pull Legs' },
    { category: 'Full Body 3-Day', value: 'Full Body' },
    { category: 'Bro Split', value: 'Bro Split' }
  ];

  const [plans, setPlans] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSearch = async (category) => {
    setActiveCategory(category);
    try {
      // api fetch
    } catch (error) {
      console.error('Error fetching workout plans:', error);
    }
  };

  return (
    <div className='muscle-selector-main-content'>
      <div className='muscle-buttons-div'>
        <div className='muscle-group-column'>
          <h3>Workout Categories</h3>
          <div className='upper-body-buttons'>
            {workoutCategories.map((cat) => (
              <button
                key={cat.value}
                className='muscleGroupButton'
                onClick={() => handleSearch(cat.value)}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='muscles-found-div'>
        {activeCategory && (
          <>
            <h3>Plans for: {activeCategory}</h3>
            <ul>
              {plans.length > 0 ? (
                plans.map((plan) => (
                  <li key={plan.id}>
                    <strong>{plan.name}</strong>
                    <p>{plan.description}</p>
                  </li>
                ))
              ) : (
                <p>No plans found for {activeCategory}</p>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
