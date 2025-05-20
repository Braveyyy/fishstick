import { useEffect } from 'react';
import { useState } from 'react';
import '../css/UserLogin.css';
import WorkoutPlan from '../modules/WorkoutPlan.js';
import { Link } from 'react-router-dom';
const EC2_ADDRESS = "http://52.53.216.175:8080";

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
            const usernameResponse = await fetch(`${EC2_ADDRESS}/api/users/username/` + username, {
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
        if(await validateLogin()) {
            try {
                const response = await fetch(`${EC2_ADDRESS}/api/users/username/` + username, {
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
                console.error('!ERROR FETCHING REQUESTS:', error);
            }
        }
    }

    const updateFirstTimeLogin = async () => {
        try {
            const response = await fetch(`${EC2_ADDRESS}/api/users/firstLogin/` + username, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
            });
        }
        catch (error) {
            console.error('!ERROR PATCHING FIRST TIME LOGIN:', error);
        }
    }

    if(successfulLogin && firstTimeLogin) {
        updateFirstTimeLogin();
        return <SuccessfulLoginFirstTime user={username}/>;
    }
    else if(successfulLogin && !firstTimeLogin) {
        return <SuccessfulLoginDefault user={username}/>;
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

function SuccessfulLoginFirstTime({user}) {
    const [errors, setErrors] = useState({ numWorkoutDays: "", targetedMuscleGroup: "", requestedRestDays: ""});
    const [numWorkoutDays, setNumWorkoutDays] = useState(0);
    const [targetedMuscleGroup, setTargetedMuscleGroup] = useState("");
    const [requestedRestDays, setRequestedRestDays] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if(numWorkoutDays <= 3) {
            setTargetedMuscleGroup("All Muscles");
        }
    }, [numWorkoutDays]);

    const validateQuestions = () => {
        let valid = true;
        const questionErrors = { numWorkoutDays: "", targetedMuscleGroup: "", requestedRestDays: "" };
        
        if(!numWorkoutDays) {
            questionErrors.numWorkoutDays = "Please select the number of days you want to workout";
            valid = false;
        }
        if(!targetedMuscleGroup) {
            questionErrors.targetedMuscleGroup = "Please select what you want to focus on";
            valid = false;
        }
        if(!requestedRestDays || (requestedRestDays.length === 0 && numWorkoutDays !== 7)) {
            questionErrors.requestedRestDays = "Please select at least one rest day";
            valid = false;
        }

        if((7 - numWorkoutDays) !== requestedRestDays.length) {
            questionErrors.requestedRestDays = `Please select ${(7 - numWorkoutDays)} rest days`;
            valid = false;
        }

        setErrors(questionErrors);
        return valid;
    }
    
    const handleQuestions = async (event) => {
        event.preventDefault();
        if(validateQuestions()) {
            try {
                const newWorkout = {username: user, numworkoutdays: numWorkoutDays, targetedmuscle: targetedMuscleGroup, requestedrestdays: requestedRestDays};
                const response = await fetch(`${EC2_ADDRESS}/api/workouts`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newWorkout)
                });
                if(!response.ok) {
                    console.error(`${response.status} ${await response.text()}`);
                    return;
                }
                setFormSubmitted(true);
            }
            catch (error) {
                console.error('!ERROR HANDLING SIGNUP:', error);
            }
        }
    }

    if(formSubmitted) {
        return (
            <div>
                <div className='login-header' style={{marginTop: "100px"}}>
                    <h1>Your Workout Plan</h1>
                    <p>Based on your goals & availability, we've generated a tailored workout plan just for you!</p>
                </div>
                <div className='login-page' style={{marginTop: "50px"}}>
                    <WorkoutPlan workoutDays={numWorkoutDays} targetedGroup={targetedMuscleGroup} restDays={requestedRestDays} />
                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
                    <Link className='login-button' to='/fishstick' state={{ username: user }} style={{ textDecoration: 'none' }}>To Your Dashboard</Link>
                </div>
            </div>    
        )
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
                                    className={numWorkoutDays === 1 ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='2'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={numWorkoutDays === 2 ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='3'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={numWorkoutDays === 3 ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='4'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={numWorkoutDays === 4 ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='5'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={numWorkoutDays === 5 ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='6'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={numWorkoutDays === 6 ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='numWorkoutDays'
                                    value='7'
                                    onClick={(e) => setNumWorkoutDays(Number(e.target.value))}
                                    className={numWorkoutDays === 7 ? "selected" : ""}
                                />
                            </div>
                            {errors.numWorkoutDays && <span className='error-message'>{errors.numWorkoutDays}</span>}
                            <br></br><br></br>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='targetedMuscleGroup'>Is there a specific muscle group you want to target?</label>
                            <div className='question-buttons'>
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Chest'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={targetedMuscleGroup === 'Chest' ? "selected" : ""}
                                    disabled={numWorkoutDays <= 3}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Back'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={targetedMuscleGroup === 'Back' ? "selected" : ""}
                                    disabled={numWorkoutDays <= 3}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Arms'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={targetedMuscleGroup === 'Arms' ? "selected" : ""}
                                    disabled={numWorkoutDays <= 3}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Shoulders'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={targetedMuscleGroup === 'Shoulders' ? "selected" : ""}
                                    disabled={numWorkoutDays <= 3}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Abs'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={targetedMuscleGroup === 'Abs' ? "selected" : ""}
                                    disabled={numWorkoutDays <= 3}
                                />
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='Legs'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={targetedMuscleGroup === 'Legs' ? "selected" : ""}
                                    disabled={numWorkoutDays <= 3}
                                />
                            </div>
                            <div className='everything-button'>
                                <input 
                                    type='button'
                                    id='targetedMuscleGroup'
                                    value='All Muscles'
                                    onClick={(e) => setTargetedMuscleGroup(e.target.value)}
                                    className={targetedMuscleGroup === 'All Muscles' ? "selected" : ""}
                                    disabled={numWorkoutDays <= 3}
                                />
                            </div>
                            {errors.targetedMuscleGroup && <span className='error-message'>{errors.targetedMuscleGroup}</span>}
                            {numWorkoutDays <= 3 && (
                                <p className='info-message'>Please add extra workout days if you would like to spend more time targeting a specific muscle group</p>
                            )}
                            <br></br><br></br>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='requestedRestDays'>What days would you like to rest?</label>
                            <div className='question-buttons'>
                                <input 
                                    type='button'
                                    id='requestedRestDays'
                                    value='Mon'
                                    onClick={requestedRestDays.includes('Mon') ? () => setRequestedRestDays(requestedRestDays.filter(day => day !== 'Mon')) : (e) => setRequestedRestDays([...requestedRestDays, e.target.value])}
                                    className={requestedRestDays.includes('Mon') ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='requestedRestDays'
                                    value='Tues'
                                    onClick={requestedRestDays.includes('Tues') ? () => setRequestedRestDays(requestedRestDays.filter(day => day !== 'Tues')) : (e) => setRequestedRestDays([...requestedRestDays, e.target.value])}
                                    className={requestedRestDays.includes('Tues') ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='requestedRestDays'
                                    value='Wed'
                                    onClick={requestedRestDays.includes('Wed') ? () => setRequestedRestDays(requestedRestDays.filter(day => day !== 'Wed')) : (e) => setRequestedRestDays([...requestedRestDays, e.target.value])}
                                    className={requestedRestDays.includes('Wed') ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='requestedRestDays'
                                    value='Thurs'
                                    onClick={requestedRestDays.includes('Thurs') ? () => setRequestedRestDays(requestedRestDays.filter(day => day !== 'Thurs')) : (e) => setRequestedRestDays([...requestedRestDays, e.target.value])}
                                    className={requestedRestDays.includes('Thurs') ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='requestedRestDays'
                                    value='Fri'
                                    onClick={requestedRestDays.includes('Fri') ? () => setRequestedRestDays(requestedRestDays.filter(day => day !== 'Fri')) : (e) => setRequestedRestDays([...requestedRestDays, e.target.value])}
                                    className={requestedRestDays.includes('Fri') ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='requestedRestDays'
                                    value='Sat'
                                    onClick={requestedRestDays.includes('Sat') ? () => setRequestedRestDays(requestedRestDays.filter(day => day !== 'Sat')) : (e) => setRequestedRestDays([...requestedRestDays, e.target.value])}
                                    className={requestedRestDays.includes('Sat') ? "selected" : ""}
                                />
                                <input 
                                    type='button'
                                    id='requestedRestDays'
                                    value='Sun'
                                    onClick={requestedRestDays.includes('Sun') ? () => setRequestedRestDays(requestedRestDays.filter(day => day !== 'Sun')) : (e) => setRequestedRestDays([...requestedRestDays, e.target.value])}
                                    className={requestedRestDays.includes('Sun') ? "selected" : ""}
                                />
                            </div>
                            {errors.requestedRestDays && <span className='error-message'>{errors.requestedRestDays}</span>}
                        </div>
                        <button type="submit" className="signup-button">
                            Proceed
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function SuccessfulLoginDefault({user}) {
    return (
        <div className='login-page'>
            <div className='login-container'>
                <div className='login-header'>
                    <h1>Welcome back, {user}!</h1>
                    <p>We're glad to see you again.</p>
                </div>
                    <Link className='login-button' to='/fishstick' state={{ username: user }} style={{ textDecoration: 'none' }}>To Your Dashboard</Link>
            </div>
        </div>
    )
}

/* 
FORM OPTIONS
<div className="form-options">
    <div className="remember-me">
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Remember me</label>
    </div>
    <a href="#" className="forgot-password">Forgot password?</a>
</div>
*/