// SignUp.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import styles from '../styles/signup.module.css';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const user = await authService.signUp(firstName, lastName, email, password);
            if (user) {
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className={styles.container}>
             <div className={`col-6 ${styles.leftPanel}`}>
            </div>
            <div className={`col-6 d-flex justify-content-center align-items-center ${styles.rightPanel}`}>
                <div className={styles.signupBox}>
                    <h2 className={styles.title}>Sign Up</h2>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className={styles.btn} onClick={handleSignUp}>Sign Up</button>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.loginLink} onClick={handleLogin}>
                        Already have an account? Log in here
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
