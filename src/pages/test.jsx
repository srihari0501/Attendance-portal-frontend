// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import authService from '../services/authService';
// import { getGreetingMessage } from '../utils/greetingMessage';
// import styles from '../styles/dashboard.module.css';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';
// import { toast } from 'react-toastify';

// function Dashboard() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [greeting, setGreeting] = useState('');
//     const [attendanceSummary, setAttendanceSummary] = useState([]);
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
//     const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
//     const today = new Date();
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userData = await authService.getUserData();
//                 setUser(userData);
//             } catch (error) {
//                 toast.error('Error fetching user data');
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         const fetchAttendanceSummary = async () => {
//             try {
//                 const summary = await authService.getAttendanceSummary(selectedMonth);
//                 setAttendanceSummary(summary);
//             } catch (error) {
//                 toast.error('Error fetching attendance summary');
//                 console.error('Error fetching attendance summary:', error);
//             }
//         };

//         fetchUserData();
//         fetchAttendanceSummary();

//         const currentTime = new Date().getHours();
//         const greetingMessage = getGreetingMessage(currentTime);
//         setGreeting(greetingMessage);
//     }, [selectedMonth]);

//     const handleLogout = () => {
//         authService.logout();
//         navigate('/login');
//     };

//     const handleLeaveManagement = () => {
//         navigate('/leave-management');
//     };

//     const handleMarkAttendance = async () => {
//         try {
//             const response = await authService.markAttendance();
//             if (response.success) {
//                 setIsAttendanceMarked(true);
//                 toast.success(response.message);
//                 // After marking attendance successfully, update the attendance summary
//                 const summary = await authService.getAttendanceSummary(selectedMonth);
//                 setAttendanceSummary(summary);
//             } else {
//                 toast.error('Failed to mark attendance. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error marking attendance:', error);
//             toast.error(error.response?.data?.message || 'Failed to mark attendance');
//         }
//     };

//     const handleMonthChange = (event) => {
//         setSelectedMonth(parseInt(event.target.value, 10));
//     };

//     const getDaysInMonth = (year, month) => {
//         return new Date(year, month, 0).getDate();
//     };

//     const getStartDate = () => {
//         return new Date(new Date().getFullYear(), selectedMonth - 1, 1);
//     };

//     const getEndDate = () => {
//         const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedMonth);
//         return new Date(new Date().getFullYear(), selectedMonth - 1, daysInMonth);
//     };

//     const renderTooltip = (value) => {
//         if (value && value.date) {
//             const options = { weekday: 'long', day: 'numeric' };
//             const formattedDate = value.date.toLocaleDateString(undefined, options);
//             return `${formattedDate}: ${value.count} ${value.count === 1 ? 'attendance' : 'attendances'}`;
//         }
//         return null;
//     };

//       const randomValues = getRange(200).map(index => {
//     return {
//       date: shiftDate(today, -index),
//       count: getRandomInt(1, 3),
//     };
//   });

// //   const randomValues1 = {attendanceSummary.map((entry) => ({
// //     date: new Date(entry.date),
// //     count: entry.status === 'present' ? 1 : 0
// // }))}


//   function getRange(count) {
//   return Array.from({ length: count }, (_, i) => i);
// }

// function shiftDate(date, numDays) {
//   const newDate = new Date(date);
//   newDate.setDate(newDate.getDate() + numDays);
//   return newDate;
// }

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// // const randomValues = getRange(200).map(index => {
// //     return {
// //       date: shiftDate(today, -index),
// //       count: getRandomInt(1, 3),
// //     };
// //   });

//     return (
        
//         <div className={styles.container}>
//             <header className={styles.header}>
//                 <div className={styles.left}>
//                     <h1>Welcome, {user && user.name}</h1>
//                     <p>{greeting}</p>
//                 </div>
//                 <div className={styles.right}>
//                     <button onClick={handleLeaveManagement}>Leave Management</button>
//                     <button onClick={handleLogout}>Logout</button>
//                 </div>
//             </header>
//             <div className={styles.content}>
//                 <div className={styles.summaryContainer}>
//                     <h2>Attendance Summary</h2>
//                     <div className={styles.monthSelector}>
//                         <label>Select Month:</label>
//                         <select value={selectedMonth} onChange={handleMonthChange}>
//                             <option value={1}>January</option>
//                             <option value={2}>February</option>
//                             <option value={3}>March</option>
//                             <option value={4}>April</option>
//                             <option value={5}>May</option>
//                             <option value={6}>June</option>
//                             <option value={7}>July</option>
//                             <option value={8}>August</option>
//                             <option value={9}>September</option>
//                             <option value={10}>October</option>
//                             <option value={11}>November</option>
//                             <option value={12}>December</option>
//                         </select>
//                     </div>
//                     <div className={styles.heatmapContainer}>
//                         {/* <CalendarHeatmap
//                             startDate={getStartDate()}
//                             endDate={getEndDate()}
//                             values={attendanceSummary.map((entry) => ({
//                                 date: new Date(entry.date),
//                                 count: entry.status === 'present' ? 1 : 0
//                             }))}
//                             classForValue={(value) => {
//                                 if (!value) {
//                                     return 'color-empty';
//                                 }
//                                 return `color-scale-${value.count}`;
//                             }}
//                             titleForValue={renderTooltip}
//                             showWeekdayLabels
//                         /> */}

//   <CalendarHeatmap
//         startDate={getStartDate()}
//         endDate={getEndDate()}
//         values= {randomValues}
//         classForValue={value => {
//           if (!value) {
//             return 'color-empty';
//           }
//           return `color-github-${value.count}`;
//         }}
//         titleForValue={renderTooltip}
//                             showWeekdayLabels={true}
//       />


//                     </div>
//                     <button onClick={handleMarkAttendance} disabled={isAttendanceMarked}>
//                         Mark Present Today
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { getGreetingMessage } from '../utils/greetingMessage';
import styles from '../styles/dashboard.module.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { toast } from 'react-toastify';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [greeting, setGreeting] = useState('');
    const [attendanceSummary, setAttendanceSummary] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
    const today = new Date();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await authService.getUserData();
                setUser(userData);
            } catch (error) {
                toast.error('Error fetching user data');
                console.error('Error fetching user data:', error);
            }
        };

        const fetchAttendanceSummary = async () => {
            try {
                const summary = await authService.getAttendanceSummary(selectedMonth);
                setAttendanceSummary(summary);
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
        navigate('/leave-management');
    };

    const handleMarkAttendance = async () => {
        try {
            const response = await authService.markAttendance();
            if (response.success) {
                setIsAttendanceMarked(true);
                toast.success(response.message);
                // After marking attendance successfully, update the attendance summary
                const summary = await authService.getAttendanceSummary(selectedMonth);
                setAttendanceSummary(summary);
            } else {
                toast.error('Failed to mark attendance. Please try again.');
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
            toast.error(error.response?.data?.message || 'Failed to mark attendance');
        }
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value, 10));
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const getStartDate = () => {
        return new Date(new Date().getFullYear(), selectedMonth - 1, 1);
    };

    const getEndDate = () => {
        const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedMonth);
        return new Date(new Date().getFullYear(), selectedMonth - 1, daysInMonth);
    };

    const renderTooltip = (value) => {
        if (value && value.date) {
            const options = { weekday: 'long', day: 'numeric' };
            const formattedDate = value.date.toLocaleDateString(undefined, options);
            return `${formattedDate}: ${value.count} ${value.count === 1 ? 'attendance' : 'attendances'}`;
        }
        return null;
    };
    return (
        
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.left}>
                    <h1>Welcome, {user && user.name}</h1>
                    <p>{greeting}</p>
                </div>
                <div className={styles.right}>
                    <button onClick={handleLeaveManagement}>Leave Management</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <div className={styles.content}>
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
                                count: entry.status === 'present' ? 1 : 0
                            }))}
                            classForValue={(value) => {
                                if (!value) {
                                    return 'color-empty';
                                }
                                return `color-scale-${value.count}`;
                            }}
                            titleForValue={renderTooltip}
                            showWeekdayLabels
                        />




                    </div>
                    <button onClick={handleMarkAttendance} disabled={isAttendanceMarked}>
                        Mark Present Today
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

