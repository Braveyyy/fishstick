import React from 'react';

const generateWorkout = (numWorkoutDays, targetedGroup, restDays) => {
    const allDays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    const availableDays = allDays.filter(day => !restDays.includes(day)).slice(0, numWorkoutDays);

    if (numWorkoutDays <= 3) {
        return availableDays.map(day => ({ day, focus: 'Full Body' }));
    }

    const foundational = ['Chest', 'Back', 'Legs'];
    const secondary = ['Arms', 'Shoulders', 'Abs'];
    const priorityList = [];

    if (targetedGroup && targetedGroup !== 'All Muscles') {
        priorityList.push(targetedGroup);
        if (numWorkoutDays >= 4) priorityList.push(targetedGroup);
    }

    foundational.forEach(group => {
        if (!priorityList.includes(group)) {
            priorityList.push(group);
        }
    });

    secondary.forEach(group => {
        if (!priorityList.includes(group)) {
            priorityList.push(group);
        }
    });

    const trimmedPriorityList = priorityList.slice(0, numWorkoutDays);
    const schedule = [];

    for (let i = 0; i < availableDays.length; i++) {
        let muscle = trimmedPriorityList[i];

        if (schedule.length > 0 && schedule[schedule.length - 1].focus === muscle) {
            for (let j = i + 1; j < trimmedPriorityList.length; j++) {
                if (trimmedPriorityList[j] !== muscle) {
                    [trimmedPriorityList[i], trimmedPriorityList[j]] = [trimmedPriorityList[j], trimmedPriorityList[i]];
                    muscle = trimmedPriorityList[i];
                    break;
                }
            }
        }

        schedule.push({ day: availableDays[i], focus: muscle });
    }

    return schedule;
};
/*{workoutPlan.map((day) => (
                        <div key={day.day}>
                            <p>{day.day}: {day.focus}</p>
                        </div>
                    ))} */
export default function WorkoutPlan({workoutDays, targetedGroup, restDays}) {
    const workoutPlan = generateWorkout(workoutDays, targetedGroup, restDays);
    return (
        <div className='workout-container'>
            
        </div>
    );
}