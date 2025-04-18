import React from 'react';
import { useState } from 'react';
import '../css/UserLogin.css';

export default function UserLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });
    const [successfulLogin, setSuccessfulLogin] = useState(false);
    const [firstTimeLogin, setFirstTimeLogin] = useState(false);

    const validateLogin = async () => {
        let valid = true;
        const loginErrors = { username : "", password: ""};
        try{
            // Check if username already in database
            const usernameResponse = await fetch("http://localhost:8080/api/users/username/" + username, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            const usernameJSON = await usernameResponse.json();
            // Check Username validty
            if(!username) {
                loginErrors.username = "Username is required";
                valid = false;
            }
            else if(usernameJSON == null || !(usernameJSON.username === username)) {
                loginErrors.username = "Username does not exist";
                valid = false;
            }
            // Check Password validity
            if(!password) {
                loginErrors.password = "Password is required";
                valid = false;
            }
            else if(password.length < 3) {
                loginErrors.password = "Password must be at least 3 characters";
                valid = false;
            }
            else if(usernameJSON == null || !(usernameJSON.password === password)) {
                loginErrors.password = "Password is incorrect";
                valid = false;
            }
        }
        catch (error) {
            console.error("!ERROR FETCHING REQUESTS:", error);
        }
        setErrors(loginErrors);
        return valid;
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("LOGIN SUBMITTED")
        if(await validateLogin()) {
            console.log("LOGIN VALIDATED")
            try{
                const response = await fetch("http://localhost:8080/api/users/username/" + username, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });
                const responseJSON = await response.json();
                if(responseJSON.firstTimeLogin) {
                    setFirstTimeLogin(true);
                }
                setSuccessfulLogin(true);
            }
            catch (error) {

            }
        }
    }

    if(successfulLogin && firstTimeLogin) {
        return <SuccessfulLoginFirstTime/>;
    }
    else if(successfulLogin && !firstTimeLogin) {
        return <SuccessfulLoginDefault/>;
    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <div className='login-card'>
                    <div className='login-header'>
                        <h1>Welcome to Fishstick</h1>
                        <p>Please sign in to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className='login-form'>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className={errors.username ? "error" : ""}
                            />
                            {errors.username && <span className="error-message">{errors.username}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input">
                                <input
                                    type={"password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={errors.password ? "error" : ""}
                                />
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#" className="forgot-password">Forgot password?</a>
                        </div>

                        <button type="submit" className="login-button">
                            Sign In
                        </button>
                    </form>
                    <div className="login-footer">
                        <p>Don't have an account? <a href="/userSignup">Sign up</a></p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

function SuccessfulLoginFirstTime() {
    const [errors, setErrors] = useState({ numWorkoutDays: "", targetedMuscleGroup: "", requestedRestDays: ""});
    const [numWorkoutDays, setNumWorkoutDays] = useState(0);
    const [targetedMuscleGroup, setTargetedMuscleGroup] = useState("");
    const [requestedRestDays, setRequestedRestDays] = useState({});

    const handleQuestions = () => {

    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <div className='login-header'>
                    <h1>Let's get you started!</h1>
                    <br></br>
                    <br></br>
                    <form onSubmit={handleQuestions} className='login-form'>
                        <div className='form-group'>
                            <label htmlFor='numWorkoutDays'>How many days a week do you want to strength train?</label>
                            <div className='question-buttons'>
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='1'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={errors.numWorkoutDays ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='2'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={errors.numWorkoutDays ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='3'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={errors.numWorkoutDays ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='4'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={errors.numWorkoutDays ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='5'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={errors.numWorkoutDays ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='6'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={errors.numWorkoutDays ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='7'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={errors.numWorkoutDays ? "error" : ""}
                                />
                            </div>
                            {errors.numWorkoutDays && <span className='error-message'>{errors.numWorkoutDays}</span>}
                            <br></br> <br></br>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='targetedMuscleGroup'>Is there a specific muscle group you want to target?</label>
                            <div className='question-buttons'>
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Chest'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={errors.targetedMuscleGroup ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Back'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={errors.targetedMuscleGroup ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Arms'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={errors.targetedMuscleGroup ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Shoulders'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={errors.targetedMuscleGroup ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Abs'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={errors.targetedMuscleGroup ? "error" : ""}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Legs'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={errors.targetedMuscleGroup ? "error" : ""}
                                />
                            </div>
                            {errors.targetedMuscleGroup && <span className='error-message'>{errors.targetedMuscleGroup}</span>}
                            <br></br><br></br>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='requestedRestDays'>What days would you like to rest?</label>
                            <div className='question-buttons'>
                                <input 
                                    type='button'
                                    id='requestedRestDays'
                                    value='Monday'
                                    onClick={(e) => setRequestedRestDays(e.target.value)}
                                    className={errors.requestedRestDays ? "error" : ""}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function SuccessfulLoginDefault() {
    
}