import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Student data for multiple students
const students = [
  {
    studentId: '22cs061',
    name: 'Olimathi',
    degree: 'B.E',
    department: 'Computer Science and Engineering',
    year: 'III',
    attendance: [
      { date: '2024-11-10', periods: ['present', 'present', 'absent', 'present', 'present', 'present', 'present'] },
      { date: '2024-11-11', periods: ['absent', 'absent', 'present', 'present', 'absent', 'present', 'present'] },
      { date: '2024-11-12', periods: ['present', 'present', 'present', 'absent', 'present', 'absent', 'present'] },
      { date: '2024-11-13', periods: ['present', 'present', 'present', 'present', 'present', 'present', 'present'] },
      { date: '2024-11-14', periods: ['present', 'present', 'present', 'absent', 'present', 'absent', 'present'] },
    ],
  },
  {
    studentId: '22cs069',
    name: 'Priyaa',
    degree: 'B.E',
    department: 'Computer Science and Engineering',
    year: 'III',
    attendance: [
      { date: '2024-11-10', periods: ['present', 'absent', 'present', 'present', 'absent', 'present', 'absent'] },
      { date: '2024-11-11', periods: ['present', 'present', 'present', 'absent', 'present', 'absent', 'present'] },
      { date: '2024-11-12', periods: ['absent', 'present', 'present', 'present', 'present', 'absent', 'present'] },
      { date: '2024-11-13', periods: ['present', 'present', 'present', 'present', 'present', 'present', 'present'] },
      { date: '2024-11-14', periods: ['present', 'absent', 'absent', 'present', 'present', 'present', 'absent'] },
    ],
  },
  {
    studentId: '22cs070',
    name: 'Ragav',
    degree: 'B.E',
    department: 'Computer Science and Engineering',
    year: 'III',
    attendance: [
      { date: '2024-11-10', periods: ['present', 'absent', 'present', 'present', 'absent', 'present', 'absent'] },
      { date: '2024-11-11', periods: ['present', 'present', 'present', 'absent', 'present', 'absent', 'present'] },
      { date: '2024-11-12', periods: ['absent', 'present', 'present', 'present', 'present', 'absent', 'present'] },
      { date: '2024-11-13', periods: ['present', 'present', 'present', 'present', 'present', 'present', 'present'] },
      { date: '2024-11-14', periods: ['present', 'absent', 'absent', 'present', 'present', 'present', 'absent'] },
    ],
  },
  {
    studentId: '22cs094',
    name: 'Sowbarnikaa',
    degree: 'B.E',
    department: 'Computer Science and Engineering',
    year: 'III',
    attendance: [
      { date: '2024-11-10', periods: ['present', 'absent', 'present', 'present', 'absent', 'present', 'absent'] },
      { date: '2024-11-11', periods: ['present', 'present', 'present', 'absent', 'present', 'absent', 'present'] },
      { date: '2024-11-12', periods: ['absent', 'present', 'present', 'present', 'present', 'absent', 'present'] },
      { date: '2024-11-13', periods: ['present', 'present', 'present', 'present', 'present', 'present', 'present'] },
      { date: '2024-11-14', periods: ['present', 'absent', 'absent', 'present', 'present', 'present', 'absent'] },
    ],
  },
  {
    studentId: '22cs101',
    name: 'Subha',
    degree: 'B.E',
    department: 'Computer Science and Engineering',
    year: 'III',
    attendance: [
      { date: '2024-11-10', periods: ['present', 'absent', 'present', 'present', 'absent', 'present', 'absent'] },
      { date: '2024-11-11', periods: ['present', 'present', 'present', 'absent', 'present', 'absent', 'present'] },
      { date: '2024-11-12', periods: ['absent', 'present', 'present', 'present', 'present', 'absent', 'present'] },
      { date: '2024-11-13', periods: ['present', 'present', 'present', 'present', 'present', 'present', 'present'] },
      { date: '2024-11-14', periods: ['present', 'absent', 'absent', 'present', 'present', 'present', 'absent'] },
    ],
  },
  // Add more students here as needed
];

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve studentId from state or localStorage
  const studentId = location.state?.studentId || localStorage.getItem('studentId');

  useEffect(() => {
    if (!studentId) {
      navigate('/'); // Redirect to login if no studentId is found
    }
  }, [studentId, navigate]);

  // Find the student data
  const student = students.find((s) => s.studentId === studentId);

  if (!student) {
    return <div>Student not found! Redirecting to login...</div>;
  }

  // Calculate attendance percentage
  const totalPeriods = student.attendance.reduce((total, record) => total + record.periods.length, 0);
  const attendedPeriods = student.attendance.reduce(
    (total, record) => total + record.periods.filter((p) => p === 'present').length,
    0
  );
  const attendancePercentage = ((attendedPeriods / totalPeriods) * 100).toFixed(2);

  return (
    <div
      className="student-dashboard"
      style={{
        minHeight: '100vh',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center the content vertically
        backdropFilter: 'blur(10px)',
      }}
    >
      <h2>Welcome, {student.name}!</h2>
      <p>Student ID: {student.studentId}</p>
      <p>Degree: {student.degree}</p>
      <p>Department: {student.department}</p>
      <p>Year: {student.year}</p>
      <p>Attendance: {attendancePercentage}%</p>
      <h3>Attendance Record</h3>

      <div style={{ width: '90%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
        
        <table
          style={{
            width: '100%',
            maxWidth: '900px', // Limit max width for large screens
            borderCollapse: 'collapse',
            backgroundColor: 'white', // Set the table background to white
            color: 'black',
            textAlign: 'center', // Center all text in the table
            marginTop: '20px', // Add some spacing above the table
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Period 1</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Period 2</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Period 3</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Period 4</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Period 5</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Period 6</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Period 7</th>
            </tr>
          </thead>
          <tbody>
            {student.attendance.map((record, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {record.date}
                </td>
                {record.periods.map((status, idx) => (
                  <td
                    key={idx}
                    style={{
                      border: '1px solid black',
                      padding: '8px',
                    }}
                  >
                    {/* Color the text (not the cell) based on the status */}
                    <span style={{ color: status === 'present' ? '#28a745' : '#dc3545' }}>
                      {status}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem('studentId'); // Clear localStorage on logout
          navigate('/');
        }}
        style={{
          marginTop: '20px',
          backgroundColor: '#8B4513',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default StudentDashboard;
