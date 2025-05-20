import React from "react";
import { useState } from "react";
import '../css/UserSignup.css';
const EC2_ADDRESS = "http://52.53.216.175:8080";

export default function UserSignup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [successfulSignup, setSuccessfulSignup] = useState(false);

    const validateSignup = async () => {
        let valid = true;
        const signupErrors = { email: "", password: ""};
        try {
            // Check if email already in database
            const emailResponse = await fetch(`${EC2_ADDRESS}/api/users/email/` + email, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            // Check if username already in database
            const usernameResponse = await fetch(`${EC2_ADDRESS}/api/users/username/` + username, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            const emailJSON = await emailResponse.json();
            const usernameJSON = await usernameResponse.json();

            // Check Email validity
            if(!email) {
                signupErrors.email = "Email is required";
                valid = false;
            }
            else if(!/\S+@\S+\.\S+/.test(email)) {
                signupErrors.email = "Invalid email";
                valid = false;
            }
            else if(emailResponse.ok && emailJSON && emailJSON.email === email) {
                signupErrors.email = "Email already has an account created";
                valid = false;
            }

            // Check Username validity
            if(!username) {
                signupErrors.username = "Username is required";
                valid = false;
            }
            else if(usernameResponse.ok && usernameJSON && usernameJSON.username === username) {
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
        }
        catch (error) {
            console.error('!ERROR FETCHING REQUESTS:', error);
        }
        setErrors(signupErrors);
        return valid;
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        if(await validateSignup()) {
            try {
                const newUser = {email: email, username: username, password: password};
                const response = await fetch(`${EC2_ADDRESS}/api/users`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newUser)
                });
                if(!response.ok) {
                    console.error(`${response.status} ${await response.text()}`);
                    return;
                }
                setSuccessfulSignup(true);
            } 
            catch (error) {
                console.error('!ERROR HANDLING SIGNUP:', error);
            }
        }
    }
    if(successfulSignup) {
        return <SuccessfulSignup/>;
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

function SuccessfulSignup () {
    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-card">
                    <h1>Signup Successful!</h1>
                    <p>Thank you for signing up. You can now log in to your account.</p>
                    <button className="signup-button" onClick={() => window.location.href = "/userLogin"}>Back to Log In Page</button>
                </div>
            </div>
        </div>
    );
}