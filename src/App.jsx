import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import LeaveManagement from './pages/LeaveManagement';
import MarkAttendance from './pages/MarkAttendance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <div className="App">
            <ToastContainer />
                <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leave-management" element={<LeaveManagement />} />
                <Route path="/mark-attendance" element={<MarkAttendance />} />
                    {/* Add more routes for other pages as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
