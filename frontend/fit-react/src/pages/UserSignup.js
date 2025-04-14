import React from "react";
import { useState } from "react";
import '../css/UserSignup.css';

export default function UserSignup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const validateSignup = () => {
        let valid = true;
        const signupErrors = { email: "", password: ""};

        // Check Email validity
        if(!email) {
            signupErrors.email = "Email is required";
            valid = false;
        }
        else if(!/\S+@\S+\.\S+/.test(email)) {
            signupErrors.email = "Invalid email";
            valid = false;
        }
        // Check Username validity
        if(!username) {
            signupErrors.username = "Username is required";
            valid = false;
        }
        else if(false) {
            // Check if username already in database
            signupErrors.username = "Username already exists";
            valid = false;
        }
        // Check Password validity
        if(!password) {
            signupErrors.password = "Password is required";
            valid = false;
        }
        else if(password.length < 6) {
            signupErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        setErrors(signupErrors);
        return valid;
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if(validateSignup()) {
            // backend API (TBA)
        }
    }
    
    return (
        <div className="signup-page">
            <div className='signup-container'>
                <div className='signup-card'>
                    <div className='signup-header'>
                        <h1>Create an Account</h1>
                        <p>Please sign up to continue</p>
                    </div>

                    <form onSubmit={handleSignup} className='signup-form'>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className={errors.email ? "error" : ""}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter a username"
                                className={errors.username ? "error" : ""}
                            />
                            {errors.username && <span className="error-message">{errors.username}</span>}

                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={errors.password ? "error" : ""}
                                />
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <button type="submit" className="signup-button">
                            Sign Up
                        </button>
                    </form>
                    <div className="signup-footer">
                        <p>Already have an account? <a href="/userLogin">Log back in</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}