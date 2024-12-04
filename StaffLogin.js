import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');

  // Staff credentials and permissions
  const staffData = [
    { loginId: '22cs001', password: 'manikandan', name: 'Mr.Manikanden', course: 'Fullstack Development' },
    { loginId: '22cs002', password: 'mythily', name: 'Mrs.Mythily', course: 'Object Oriented Programming' },
    { loginId: '22cs003', password: 'radha', name: 'Mrs.Radha', course: 'Deep Learning' },
    { loginId: '22cs004', password: 'deepa', name: 'Mrs.Deepa', course: 'Cloud Computing' },
    { loginId: '22cs005', password: 'savitha', name: 'Mrs.Savitha', course: 'UI/UX Design' },
    { loginId: '22cs006', password: 'sathish', name: 'Mr.Sathish', course: 'Principle of Compiler Design' },
    { loginId: '22cs007', password: 'navith', name: 'Mr.Navith Khan', course: 'Technical Training' },
    { loginId: '22cs008', password: 'mani', name: 'Mr.Mani', course: 'Proctor/AC/Hod' },
    { loginId: '22cs009', password: 'savitha', name: 'Mrs.Savitha', course: 'NPTEL' },
  ];

  const handleCancel = () => {
    navigate('/'); // Navigate back to home
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Find staff by loginId (instead of using array index)
    const staff = staffData.find((s) => s.loginId === staffId);

    // Validate staff ID and password
    if (!staff) {
      alert('Invalid Staff ID');
      return;
    }

    if (staff.password !== password) {
      alert('Invalid Password');
      return;
    }

    // Call the onLogin function passed from App.js to update login state
    onLogin(staffId, password); // Pass the staffId and password to App.js

    // Simulate successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', 'staff');
    localStorage.setItem('allowedPeriods', JSON.stringify(staff.allowedPeriods));

    navigate('/dashboard'); // Navigate to dashboard
  };

  return (
    <div className="login-form">
      <h2>Staff Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="staffId">Staff ID:</label>
          <input
            type="text"
            id="staffId"
            name="staffId"
            value={staffId}
            maxLength="10"
            onChange={(e) => setStaffId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#6B8E23', color: 'white' }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{ backgroundColor: '#8B4513', color: 'white' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default StaffLogin;
