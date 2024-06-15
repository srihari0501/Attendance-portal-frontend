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
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
        if (value.trim() === '') {
            setFirstNameError('First Name is required');
        } else {
            setFirstNameError('');
        }
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
        if (value.trim() === '') {
            setLastNameError('Last Name is required');
        } else {
            setLastNameError('');
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value.trim() === '') {
            setEmailError('Email is required');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value.trim() === '') {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const handleFirstNameBlur = () => {
        if (firstName.trim() === '') {
            setFirstNameError('First Name is required');
        }
    };

    const handleLastNameBlur = () => {
        if (lastName.trim() === '') {
            setLastNameError('Last Name is required');
        }
    };

    const handleEmailBlur = () => {
        if (email.trim() === '') {
            setEmailError('Email is required');
        }
    };

    const handlePasswordBlur = () => {
        if (password.trim() === '') {
            setPasswordError('Password is required');
        }
    };

    const handleSignUp = async () => {
        let firstNameValid = true;
        let lastNameValid = true;
        let emailValid = true;
        let passwordValid = true;

        if (!firstName.trim()) {
            setFirstNameError('First Name is required');
            firstNameValid = false;
        } else {
            setFirstNameError('');
        }

        if (!lastName.trim()) {
            setLastNameError('Last Name is required');
            lastNameValid = false;
        } else {
            setLastNameError('');
        }

        if (!email.trim()) {
            setEmailError('Email is required');
            emailValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            passwordValid = false;
        } else {
            setPasswordError('');
        }

        if (firstNameValid && lastNameValid && emailValid && passwordValid) {
            try {
                const user = await authService.signUp(firstName, lastName, email, password);
                if (user) {
                    navigate('/login');
                }
            } catch (error) {
                toast.error('SignUp failed, '+ error);
                setError(error.message);
            }
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
                            onChange={handleFirstNameChange}
                            onBlur={handleFirstNameBlur} // Validate on blur
                        />
                        {firstNameError && <div className={styles.error}>{firstNameError}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={handleLastNameChange}
                            onBlur={handleLastNameBlur} // Validate on blur
                        />
                        {lastNameError && <div className={styles.error}>{lastNameError}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur} // Validate on blur
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
                            onBlur={handlePasswordBlur} // Validate on blur
                        />
                        {passwordError && <div className={styles.error}>{passwordError}</div>}
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
