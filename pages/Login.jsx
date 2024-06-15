// Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import styles from '../styles/login.module.css';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State for loading spinner
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true); // Start loading

        try {
            const user = await authService.login(email, password);
            if (user) {
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error('Login failed');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleRegister = () => {
        navigate('/signup');
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
                    <button className={styles.btn} onClick={handleLogin} disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <div>
                        <div className={styles.loginLink} onClick={handleRegister}>
                            Not registered? Sign up here
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;