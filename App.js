import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import StudentLogin from './StudentLogin';
import StaffLogin from './StaffLogin';
import ACLogin from './ACLogin';
import StudentDashboard from './StudentDashboard';
import Dashboard from './Dashboard';
import ACDashboard from './ACDashboard';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staffInfo, setStaffInfo] = useState(null);

  // Define staff data with loginId, password, name, and course
  const staffData = [
    { loginId: '22cs001', password: 'manikandan', name: 'Mr.Manikandan', course: 'Fullstack Development' },
    { loginId: '22cs002', password: 'mythily', name: 'Mrs.Mythily', course: 'Object Oriented Programming' },
    { loginId: '22cs003', password: 'radha', name: 'Mrs.Radha', course: 'Deep Learning' },
    { loginId: '22cs004', password: 'deepa', name: 'Mrs.Deepa', course: 'Cloud Computing' },
    { loginId: '22cs005', password: 'savitha', name: 'Mrs.Savitha', course: 'UI/UX Design' },
    { loginId: '22cs006', password: 'sathish', name: 'Mr.Sathish', course: 'Principle of Compiler Design' },
    { loginId: '22cs007', password: 'navith', name: 'Mr.Navith Khan', course: 'Technical Training' },
    { loginId: '22cs008', password: 'mani', name: 'Mr.Mani', course: 'Proctor/AC/Hod' },
    { loginId: '22cs009', password: 'savitha', name: 'Mrs.Savitha', course: 'NPTEL' },
  ];

  const handleLogin = (loginId, password) => {
    // Find the staff based on loginId and password
    const staff = staffData.find(
      (staff) => staff.loginId === loginId && staff.password === password
    );

    if (staff) {
      setUserRole('staff');
      setStaffInfo(staff);
      setIsLoggedIn(true);
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    setStaffInfo(null);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="header">
          <h1 className="main-heading">Attendance Management System</h1>
          <div className="sub-heading">Track & Manage Attendance Efficiently</div>
        </div>

        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              !isLoggedIn ? (
                <div className="login-options">
                  <Link to="/staff-login" className="login-button staff">
                    <i className="fas fa-user-tie"></i>
                    <span>Staff Login</span>
                  </Link>

                  <div className="divider"><span>OR</span></div>

                  <Link to="/student-login" className="login-button student">
                    <i className="fas fa-user-graduate"></i>
                    <span>Student Login</span>
                  </Link>

                  <div className="divider"><span>OR</span></div>

                  <Link to="/ac-login" className="login-button ac">
                    <i className="fas fa-user"></i>
                    <span>AC Login</span>
                  </Link>
                </div>
              ) : (
                <Navigate to={userRole === 'staff' ? '/dashboard' : userRole === 'student' ? '/student-dashboard' : '/ac-dashboard'} />
              )
            }
          />

          {/* Staff Login */}
          <Route
            path="/staff-login"
            element={
              !isLoggedIn ? (
                <StaffLogin onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          {/* Student Login */}
          <Route
  path="/student-login"
  element={
    !isLoggedIn ? (
      <StudentLogin
        onLogin={() => {
          setIsLoggedIn(true);
          setUserRole('student');
        }}
      />
    ) : (
      <Navigate to="/student-dashboard" />
    )
  }
/>


          {/* AC Login */}
          <Route
            path="/ac-login"
            element={
              !isLoggedIn ? (
                <ACLogin
                  onLogin={() => {
                    setIsLoggedIn(true);
                    setUserRole('ac');
                  }}
                />
              ) : (
                <Navigate to="/ac-dashboard" />
              )
            }
          />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn && userRole === 'staff' ? (
                <Dashboard onLogout={handleLogout} staffInfo={staffInfo} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/student-dashboard"
            element={
              isLoggedIn && userRole === 'student' ? (
                <StudentDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/ac-dashboard"
            element={
              isLoggedIn && userRole === 'ac' ? (
                <ACDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
