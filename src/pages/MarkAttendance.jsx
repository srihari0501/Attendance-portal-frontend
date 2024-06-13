// components/MarkAttendance.jsx
import React, { useState } from 'react';
import authService from '../services/authService';
import { toast } from 'react-toastify';

function MarkAttendance() {
    const handleMarkAttendance = async () => {
        try {
            const response = await authService.markAttendance();
            toast.success(response.message); // Show success toast
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to mark attendance'); // Show error toast
        }
    };

    return (
        <div>
            <h2>Mark Attendance</h2>
            <button onClick={handleMarkAttendance}>Mark Present Today</button>
        </div>
    );
}

export default MarkAttendance;
