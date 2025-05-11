import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LandingPage from './pages/LandingPage';
import WorkoutPlans from './pages/WorkoutPlans';
import Exercise from './pages/Exercises';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import Dashboard from './pages/MainDashboard';
import { UserProvider, useUser } from './modules/UserContext';
import FishstickContainer from './pages/FishstickContainer';
//import reportWebVitals from './reportWebVitals';

export default function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="fishstick" element={<FishstickContainer currentLoggedInUser={useUser()}/>}></Route>
            <Route path="userSignup" element={<UserSignup/>}></Route>
            <Route path="userLogin" element={<UserLogin/>}></Route>
            <Route path="workoutPlans" element={<WorkoutPlans/>}></Route>
            <Route path="exercises" element={<Exercise/>}></Route>
            <Route path="dashboard" element={<Dashboard/>}></Route>
          </Routes>
        </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
        <App />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
