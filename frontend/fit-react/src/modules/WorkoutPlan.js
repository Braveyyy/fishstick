import React from 'react';
import '../css/WorkoutPlan.css';

const generateWorkout = (numWorkoutDays, targetedGroup, restDays) => {
    const allDays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    const workoutDays = allDays.filter(day => !restDays.includes(day)).slice(0, numWorkoutDays);

    // Create a base schedule with all days
    const schedule = allDays.map(day => ({
        day,
        focus: restDays.includes(day) ? 'Rest' : null
    }));

    if (numWorkoutDays <= 3) {
        let workoutIndex = 0;
        for (let i = 0; i < schedule.length && workoutIndex < workoutDays.length; i++) {
            if (schedule[i].focus === null) {
                schedule[i].focus = 'Full Body';
                workoutIndex++;
            }
        }
        return schedule;
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
    let focusIndex = 0;

    for (let i = 0; i < schedule.length && focusIndex < numWorkoutDays; i++) {
        if (schedule[i].focus === null) {
            let muscle = trimmedPriorityList[focusIndex];

            if (i > 0 && schedule[i - 1].focus === muscle) {
                for (let j = focusIndex + 1; j < trimmedPriorityList.length; j++) {
                    if (trimmedPriorityList[j] !== muscle) {
                        [trimmedPriorityList[focusIndex], trimmedPriorityList[j]] = [trimmedPriorityList[j], trimmedPriorityList[focusIndex]];
                        muscle = trimmedPriorityList[focusIndex];
                        break;
                    }
                }
            }

            schedule[i].focus = muscle;
            focusIndex++;
        }
    }

    return schedule;
};


export default function WorkoutPlan({workoutDays, targetedGroup, restDays}) {
    const workoutPlan = generateWorkout(workoutDays, targetedGroup, restDays);
    return (
        <div className="workout-plan-container">
            <div className="plan-summary">
                <div className="days-preview-row">
                    {workoutPlan.map((day, index) => {
                        const isRestDay = typeof day.focus === "string" && (day.focus.includes("Rest") || day.focus.includes("Recovery"));
                        return (
                            <div key={index} className={`day-row-item ${isRestDay ? "rest-day" : "workout-day"}`}>
                                <div className="day-name">{day.day.substring(0, 3)}</div>
                                <div className="day-focus-label">{day.focus}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}