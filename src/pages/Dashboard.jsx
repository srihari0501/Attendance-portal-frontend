import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { getGreetingMessage } from '../utils/greetingMessage';
import styles from '../styles/dashboard.module.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { toast } from 'react-toastify';
import Spinner from './Spinner'; // Import the Spinner component

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [greeting, setGreeting] = useState('');
    const [attendanceSummary, setAttendanceSummary] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
    const [loading, setLoading] = useState(true); // State for loading spinner
    const [daysPresent, setDaysPresent] = useState(0);
    const [daysAbsent, setDaysAbsent] = useState(0);
    const [loadingLeaveManagement, setLoadingLeaveManagement] = useState(false); // State for leave management button loading

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await authService.getUserData();
                setUser(userData);
            } catch (error) {
                toast.error('Error fetching user data');
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Turn off loading spinner after fetching data
            }
        };

        const fetchAttendanceSummary = async () => {
            try {
                const summary = await authService.getAttendanceSummary(selectedMonth);
                setAttendanceSummary(summary);
                calculateAttendance(summary);
            } catch (error) {
                toast.error('Error fetching attendance summary');
                console.error('Error fetching attendance summary:', error);
            }
        };

        fetchUserData();
        fetchAttendanceSummary();

        const currentTime = new Date().getHours();
        const greetingMessage = getGreetingMessage(currentTime);
        setGreeting(greetingMessage);
    }, [selectedMonth]);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const handleLeaveManagement = () => {
        setLoadingLeaveManagement(true); // Set loading state for leave management button
        navigate('/leave-management');
        setLoadingLeaveManagement(false); // Reset loading state after navigation
    };

    const handleMarkAttendance = async () => {
        setLoading(true); // Show spinner when marking attendance
        try {
            const response = await authService.markAttendance();
            if (response.success) {
                setIsAttendanceMarked(true);
                toast.success(response.message);
                // After marking attendance successfully, update the attendance summary
                const summary = await authService.getAttendanceSummary(selectedMonth);
                setAttendanceSummary(summary);
                calculateAttendance(summary);
            } else {
                toast.error('Failed to mark attendance. Please try again.');
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
            toast.error(error.response?.data?.message || 'Failed to mark attendance');
        } finally {
            setLoading(false); // Turn off spinner after marking attendance
        }
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value, 10));
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const calculateAttendance = (summary) => {
        const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedMonth);
        let presentCount = 0;
        let absentCount = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(new Date().getFullYear(), selectedMonth - 1, day);

            const isPresent = summary.some(entry => {
                const entryDate = new Date(entry.date);
                return entryDate.getDate() === currentDate.getDate() &&
                       entryDate.getMonth() === currentDate.getMonth();
            });

            if (isPresent) {
                presentCount++;
            } else {
                absentCount++;
            }
        }

        setDaysPresent(presentCount);
        setDaysAbsent(absentCount);
    };

    const renderTooltip = (value) => {
        const options = { weekday: 'long', day: 'numeric' };

        if (value && value.date) {
            const formattedDate = value.date.toLocaleDateString(undefined, options);

            // Find matching entry in attendanceSummary for the current value.date
            const matchingEntry = attendanceSummary.find(entry => {
                const entryDate = new Date(entry.date);
                return entryDate.getDate() === value.date.getDate() && entryDate.getMonth() === value.date.getMonth();
            });

            if (matchingEntry) {
                return `${formattedDate}: Present`;
            } else {
                return `${formattedDate}: Absent`;
            }
        } else {
            return '';
        }
    };

    const getStartDate = () => {
        return new Date(new Date().getFullYear(), selectedMonth - 1, 1);
    };

    const getEndDate = () => {
        const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedMonth);
        return new Date(new Date().getFullYear(), selectedMonth - 1, daysInMonth);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.left}>
                    <h1>Welcome, {user && user.firstName}</h1>
                    <p>{greeting}</p>
                </div>
                <div className={styles.right}>
                    <button onClick={handleLeaveManagement}>
                        {loadingLeaveManagement ? <Spinner /> : 'Leave Management'}
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <div className={styles.content}>
                {loading ? (
                    <Spinner /> // Show spinner while loading is true
                ) : (
                    <div className={styles.summaryContainer}>
                        <h2>Attendance Summary</h2>
                        <div className={styles.monthSelector}>
                            <label>Select Month:</label>
                            <select value={selectedMonth} onChange={handleMonthChange}>
                                <option value={1}>January</option>
                                <option value={2}>February</option>
                                <option value={3}>March</option>
                                <option value={4}>April</option>
                                <option value={5}>May</option>
                                <option value={6}>June</option>
                                <option value={7}>July</option>
                                <option value={8}>August</option>
                                <option value={9}>September</option>
                                <option value={10}>October</option>
                                <option value={11}>November</option>
                                <option value={12}>December</option>
                            </select>
                        </div>
                        <div className={styles.heatmapContainer}>
                            <CalendarHeatmap
                                startDate={getStartDate()}
                                endDate={getEndDate()}
                                values={attendanceSummary.map((entry) => ({
                                    date: new Date(entry.date),
                                    count: 1 // Indicating presence
                                }))}
                                classForValue={(value) => {
                                    if (!value) {
                                        return 'color-empty';
                                    }
                                    return `color-scale-${value.count}`;
                                }}
                                titleForValue={renderTooltip} // Ensure this is set
                                showWeekdayLabels
                            />
                        </div>
                        <div className={styles.attendanceSummary}>
                            <p>Days Present: {daysPresent}</p>
                            <p>Days Absent: {daysAbsent}</p>
                        </div>
                        <button onClick={handleMarkAttendance} disabled={isAttendanceMarked}>
                            Mark Present Today
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
