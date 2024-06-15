import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import leaveService from '../services/leaveService';
import styles from '../styles/leavemanagement.module.css';
import { toast } from 'react-toastify';

function LeaveManagement() {
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([]);
    const [newLeave, setNewLeave] = useState({ startDate: '', endDate: '', reason: '', userId: '' });
    const [editLeave, setEditLeave] = useState(null);
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false); // Track whether in edit mode

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const fetchedLeaves = await leaveService.getUserLeaves(userId);
                setLeaves(fetchedLeaves);
            } catch (error) {
                toast.error('Error fetching leaves, ' + error);
                console.error('Error fetching leaves:', error);
            }
        };

        fetchLeaves();
    }, []);

    const validateFields = (leave) => {
        const newErrors = {};
        if (!leave.startDate) newErrors.startDate = 'Start date is required';
        if (!leave.endDate) newErrors.endDate = 'End date is required';
        if (!leave.reason) newErrors.reason = 'Reason is required';
        return newErrors;
    };

    const handleAddLeave = async () => {
        const validationErrors = validateFields(newLeave);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const addedLeave = await leaveService.addLeave({ ...newLeave, userId });
            setLeaves([...leaves, addedLeave]);
            setNewLeave({ startDate: '', endDate: '', reason: '', userId: '' });
            setErrors({});
            toast.success('Leave request successfully added');
        } catch (error) {
            toast.error('Error adding leave, '+ error);
            console.error('Error adding leave:', error);
        }
    };

    const handleDeleteLeave = async (leaveId) => {
        try {
            await leaveService.deleteLeave(leaveId);
            setLeaves(leaves.filter((leave) => leave._id !== leaveId));
            toast.success('Leave request successfully deleted');
        } catch (error) {
            toast.error('Error deleting leave, ' + error);
            console.error('Error deleting leave:', error);
        }
    };

    const handleEditLeave = async () => {
        const validationErrors = validateFields(editLeave);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const updatedLeave = await leaveService.updateLeave(editLeave._id, editLeave);
            const updatedLeaves = leaves.map((leave) => (leave._id === updatedLeave._id ? updatedLeave : leave));
            setLeaves(updatedLeaves);
            setEditLeave(null);
            setEditMode(false); // Exit edit mode
            setErrors({});
            toast.success('Leave request successfully updated');
        } catch (error) {
            toast.error('Error updating leave, '+ error);
            console.error('Error updating leave:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditLeave(null);
        setEditMode(false); // Exit edit mode
        setErrors({}); // Reset errors on cancel
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-CA', options);
    };

    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    const handleEditButtonClick = (leave) => {
        setEditMode(true); // Enter edit mode
        setEditLeave({
            ...leave,
            startDate: leave.startDate.split('T')[0],
            endDate: leave.endDate.split('T')[0]
        });
    };

    const handleNewLeaveInputChange = (e) => {
        const { name, value } = e.target;
        const updatedLeave = { ...newLeave, [name]: value };
        setNewLeave(updatedLeave);

        // Validate the field on change
        const validationErrors = validateFields(updatedLeave);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
        }
    };

    const handleEditLeaveInputChange = (e) => {
        const { name, value } = e.target;
        const updatedLeave = { ...editLeave, [name]: value };
        setEditLeave(updatedLeave);

        // Validate the field on change
        const validationErrors = validateFields(updatedLeave);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.left}>
                    <h1>Leave Management</h1>
                </div>
                <div className={styles.right}>
                    <button onClick={handleDashboard} className={styles['nav-button']}>
                        Dashboard
                    </button>
                    <button onClick={handleLogout} className={styles['nav-button']}>
                        Logout
                    </button>
                </div>
            </header>

            <div className={styles.leaveForm}>
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={newLeave.startDate}
                        onChange={handleNewLeaveInputChange}
                    />
                    {errors.startDate && !editMode && <span className={styles.error}>{errors.startDate}</span>}
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={newLeave.endDate}
                        onChange={handleNewLeaveInputChange}
                    />
                    {errors.endDate && !editMode && <span className={styles.error}>{errors.endDate}</span>}
                </label>
                <label>
                    Reason:
                    <input
                        type="text"
                        name="reason"
                        placeholder="Reason"
                        value={newLeave.reason}
                        onChange={handleNewLeaveInputChange}
                    />
                    {errors.reason && !editMode && <span className={styles.error}>{errors.reason}</span>}
                </label>
                <button onClick={handleAddLeave}>Add Leave</button>
            </div>

            <ul>
                {leaves.map((leave) => (
                    <li key={leave._id} className={editLeave && editLeave._id === leave._id ? styles.editing : ''}>
                        {editLeave && editLeave._id === leave._id ? (
                            <div className={styles.editFormContainer}>
                                <div className={styles.editForm}>
                                    <label>
                                        Start Date:
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={editLeave.startDate}
                                            onChange={handleEditLeaveInputChange}
                                        />
                                        {errors.startDate && editMode && <span className={styles.error}>{errors.startDate}</span>}
                                    </label>
                                    <label>
                                        End Date:
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={editLeave.endDate}
                                            onChange={handleEditLeaveInputChange}
                                        />
                                        {errors.endDate && editMode && <span className={styles.error}>{errors.endDate}</span>}
                                    </label>
                                    <label>
                                        Reason:
                                        <input
                                            type="text"
                                            name="reason"
                                            value={editLeave.reason}
                                            onChange={handleEditLeaveInputChange}
                                        />
                                        {errors.reason && editMode && <span className={styles.error}>{errors.reason}</span>}
                                    </label>
                                    <button onClick={handleEditLeave} className={styles['editButton']}>
                                        Save
                                    </button>
                                    <button onClick={handleCancelEdit} className={styles['cancelButton']}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <strong>Date:</strong> {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                                </div>
                                <div>
                                    <strong>Reason:</strong> {leave.reason}
                                </div>
                                <div>
                                    <strong>No of days:</strong> {calculateDays(leave.startDate, leave.endDate)}
                                </div>
                                <div>
                                    <button onClick={() => handleEditButtonClick(leave)} className={styles['editButton']}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteLeave(leave._id)} className={styles['deleteButton']}>
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeaveManagement;
