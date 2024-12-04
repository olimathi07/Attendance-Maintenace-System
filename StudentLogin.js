import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock student data
const studentData = [
  { id: '22cs061', password: 'olimathi', name: 'Student 1', attendance: 85 },
  { id: '22cs069', password: 'priyaa', name: 'Student 2', attendance: 90 },
  { id: '22cs070', password: 'ragav', name: 'Student 3', attendance: 78 },
  { id: '22cs094', password: 'sow', name: 'Student 4', attendance: 92 },
  { id: '22cs101', password: 'subha', name: 'Student 5', attendance: 88 },
];

const StudentLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleCancel = () => {
    navigate('/'); // Navigate to home if user cancels login
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Find the student by ID and password
    const student = studentData.find(
      (s) => s.id === studentId && s.password === password
    );
  
    if (student) {
      // Save studentId to localStorage for persistence
      localStorage.setItem('studentId', student.id);
  
      // Navigate to student dashboard with state
      onLogin(student); // Keep this if required elsewhere
      navigate('/student-dashboard', { state: { studentId: student.id } });
    } else {
      // Handle login failure
      alert('Invalid Student ID or Password');
    }
  };
  

  return (
    <div className="login-form">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#6B8E23', color: 'white' }} // Olive green shade for login button
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{ backgroundColor: '#8B4513', color: 'white' }} // Saddle brown shade for cancel button
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;
