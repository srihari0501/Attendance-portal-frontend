import axios from 'axios';

const API_URL = 'https://attendance-portal-backend-01im.onrender.com/api';

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
