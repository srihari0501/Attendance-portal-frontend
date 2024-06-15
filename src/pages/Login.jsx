// Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import styles from '../styles/login.module.css';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        let emailValid = true;
        let passwordValid = true;

        if (!email) {
            setEmailError('Email is required');
            emailValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            passwordValid = false;
        } else {
            setPasswordError('');
        }

        if (emailValid && passwordValid) {
            try {
                const user = await authService.login(email, password);
                if (user) {
                    navigate('/dashboard');
                }
            } catch (error) {
                toast.error('Login failed');
            }
        }
    };

    const handleRegister = () => {
        navigate('/signup');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value.trim() === '') {
            setEmailError('Email is required');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.trim() === '') {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const handleEmailBlur = () => {
        if (!email) {
            setEmailError('Email is required');
        }
    };

    const handlePasswordBlur = () => {
        if (!password) {
            setPasswordError('Password is required');
        }
    };

    return (
        <div className={styles.container}>
            <div className={`col-6 ${styles.leftPanel}`}>
            </div>
            <div className={`col-6 d-flex justify-content-center align-items-center ${styles.rightPanel}`}>
                <div className={styles.loginBox}>
                    <h2 className={styles.title}>Login</h2>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                        />
                        {emailError && <div className={styles.error}>{emailError}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                        />
                        {passwordError && <div className={styles.error}>{passwordError}</div>}
                    </div>
                    <button className={styles.btn} onClick={handleLogin}>Login</button>
                    <div>
                        <div className={styles.loginLink} onClick={handleRegister}>Not registered? Sign up here</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
