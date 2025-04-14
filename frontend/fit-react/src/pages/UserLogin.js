import React from 'react';
import { useState } from 'react';
import '../css/UserLogin.css';

export default function UserLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });

    const validateLogin = () => {
        let valid = true;
        const loginErrors = { username : "", password: ""};

        // Check Username validty
        if(!username) {
            loginErrors.username = "Username is required";
            valid = false;
        }
        else if(false) {
            // check if username already in database
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
        else if(false) {
            // check if password matches in database
            valid = false;
        }

        setErrors(loginErrors);
        return valid;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("LOGIN SUBMITTED")
        if(validateLogin()) {
            console.log("LOGIN VALIDATED")
            // backend API (TBA)
        }
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