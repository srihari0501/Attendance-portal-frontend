// LeaveManagement.jsx

import React, { useState, useEffect } from 'react';
import leaveService from '../services/leaveService';
import styles from '../styles/leavemanagement.module.css';

function LeaveManagement() {
    const [leaves, setLeaves] = useState([]);
    const [newLeave, setNewLeave] = useState({ startDate: '', endDate: '', reason: '' });

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const fetchedLeaves = await leaveService.getLeaves();
                setLeaves(fetchedLeaves);
            } catch (error) {
                console.error('Error fetching leaves:', error);
            }
        };

        fetchLeaves();
    }, []);

    const handleAddLeave = async () => {
        try {
            const addedLeave = await leaveService.addLeave(newLeave);
            setLeaves([...leaves, addedLeave]);
            setNewLeave({ startDate: '', endDate: '', reason: '' });
        } catch (error) {
            console.error('Error adding leave:', error);
        }
    };

    const handleDeleteLeave = async (leaveId) => {
        try {
            await leaveService.deleteLeave(leaveId);
            setLeaves(leaves.filter((leave) => leave._id !== leaveId));
        } catch (error) {
            console.error('Error deleting leave:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Leave Management</h1>
            <div>
                <input
                    type="date"
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                />
                <input
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Reason"
                    value={newLeave.reason}
                    onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                />
                <button onClick={handleAddLeave}>Add Leave</button>
            </div>
            <ul>
                {leaves.map((leave) => (
                    <li key={leave._id}>
                        {leave.startDate} - {leave.endDate}: {leave.reason}
                        <button onClick={() => handleDeleteLeave(leave._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeaveManagement;
