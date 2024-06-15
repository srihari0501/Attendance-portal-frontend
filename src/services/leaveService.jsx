import axios from 'axios';

const API_URL = 'https://attendance-portal-backend-01im.onrender.com/api'; // Update with your backend URL

const leaveService = {
    async getUserLeaves() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/leave/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user leaves');
        }
    },

    async addLeave(leave) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/leave`, leave, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to add leave');
        }
    },

    async deleteLeave(leaveId) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API_URL}/leave/${leaveId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete leave');
        }
    },

    async updateLeave(leaveId, leave) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/leave/${leaveId}`, leave, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to update leave');
        }
    }
};

export default leaveService;
