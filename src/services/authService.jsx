// // authService.js

import axios from 'axios';

// const API_URL = 'http://localhost:3000'; // Update with your backend URL

// const authService = {
//     async login(email, password) {
//         try {
//             const response = await axios.post(`${API_URL}/login`, { email, password });
//             return response.data; // Assuming backend returns user data upon successful login
//         } catch (error) {
//             throw new Error('Login failed'); // Handle error (e.g., display error message to user)
//         }
//     },
//     async signUp(firstName, lastName, email, password) {
//         try {
//             const userData = {
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 password: password
//             };

//             console.log(userData);
//             const response = await axios.post(`${API_URL}/signup`, userData);
//             return response.data; // Assuming backend returns user data upon successful sign-up
//         } catch (error) {
//             throw new Error('Sign-up failed'); // Handle error (e.g., display error message to user)
//         }
//     },
//    // authService.js

// // Existing code...

// async getUserData() {
//     try {
//         const response = await axios.get(`${API_URL}/userData`);
//         return response.data;
//     } catch (error) {
//         throw new Error('Failed to fetch user data');
//     }
// },

// async getAttendanceSummary() {
//     try {
//         const response = await axios.get(`${API_URL}/attendance/summary`);
//         return response.data;
//     } catch (error) {
//         throw new Error('Failed to fetch attendance summary');
//     }
// },

// };

// export default authService;

const API_URL = 'http://localhost:3000/api';

const authService = {
    async login(email, password) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token); 
            return response.data;
        } catch (error) {
            throw new Error('Login failed');
        }
    },
    async signUp(firstName, lastName, email, password) {
        try {
            const userData = { firstName, lastName, email, password };
            const response = await axios.post(`${API_URL}/auth/signup`, userData);
            return response.data;
        } catch (error) {
            throw new Error('Sign-up failed');
        }
    },
    async getUserData() {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.get(`${API_URL}/dashboard/userData`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user data');
        }
    },
    async getAttendanceSummary() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/dashboard/attendance/summary`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch attendance summary');
        }
    },
    async markAttendance() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/attendance/mark`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
    },
};

export default authService;
