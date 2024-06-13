import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update with your backend URL

const leaveService = {
    async getLeaves() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/leaves`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch leaves');
        }
    },
    async addLeave(leave) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/leaves`, leave, {
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
            const response = await axios.delete(`${API_URL}/leaves/${leaveId}`, {
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
            const response = await axios.put(`${API_URL}/leaves/${leaveId}`, leave, {
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
