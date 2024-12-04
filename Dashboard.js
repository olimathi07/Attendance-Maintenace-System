import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

const Dashboard = ({ onLogout, staffInfo }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState(null);

  const defaultStudents = useMemo(
    () => [
      {
        _id: '22cs061',
        name: 'Olimathi',
        department: 'Computer Science And Engineering',
        attendance: { date: '2024-12-03', status: '', finalized: false },
      },
      {
        _id: '22cs069',
        name: 'Priyaa',
        department: 'Computer Science And Engineering',
        attendance: { date: '2024-12-03', status: '', finalized: false },
      },
      {
        _id: '22cs070',
        name: 'Ragav',
        department: 'Computer Science And Engineering',
        attendance: { date: '2024-12-03', status: '', finalized: false },
      },
      {
        _id: '22cs094',
        name: 'Sowbarnikaa',
        department: 'Computer Science And Engineering',
        attendance: { date: '2024-12-03', status: '', finalized: false },
      },
      {
        _id: '22cs101',
        name: 'Subha',
        department: 'Computer Science And Engineering',
        attendance: { date: '2024-12-03', status: '', finalized: false },
      },
    ],
    []
  );

  const fetchStudentsData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching students data:', error);
      setError('');
      setStudents(defaultStudents);
    }
  }, [defaultStudents]);

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  const markAttendance = (studentId, status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student._id === studentId) {
          if (student.attendance.finalized) {
            alert('Attendance has already been finalized and cannot be changed.');
            return student;
          }
          return {
            ...student,
            attendance: { ...student.attendance, status, finalized: true },
          };
        }
        return student;
      })
    );
  };

  const totalPresent = students.filter((student) => student.attendance.status === 'p').length;
  const totalAbsent = students.filter((student) => student.attendance.status === 'a').length;

  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Dashboard - {currentDate}</h1>

      {/* Staff Information */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2>Welcome, {staffInfo.name}</h2>
        <p>Course: {staffInfo.course}</p>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search students by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '100%',
            backgroundColor: '#f9f9f9',
            fontSize: '16px',
          }}
        />
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Student Table */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          color: '#333',
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Student ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Department</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Present</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Absent</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((student) =>
              student.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((student) => (
              <tr
                key={student._id}
                style={{
                  backgroundColor:
                    student.attendance.status === 'p'
                      ? 'rgba(144, 238, 144, 0.2)' // Light green
                      : student.attendance.status === 'a'
                      ? 'rgba(255, 99, 71, 0.2)' // Light red
                      : 'transparent',
                }}
              >
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student._id}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.department}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.attendance.date}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={student.attendance.status === 'p'}
                    disabled={student.attendance.finalized}
                    onChange={() => markAttendance(student._id, 'p')}
                    style={{
                      accentColor: 'green',
                      cursor: student.attendance.finalized ? 'not-allowed' : 'pointer',
                    }}
                  />
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={student.attendance.status === 'a'}
                    disabled={student.attendance.finalized}
                    onChange={() => markAttendance(student._id, 'a')}
                    style={{
                      accentColor: 'red',
                      cursor: student.attendance.finalized ? 'not-allowed' : 'pointer',
                    }}
                  />
                </td>
              </tr>
            ))}
          {/* Summary Row */}
          <tr>
            <td colSpan="3" style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
              <strong>Total</strong>
            </td>
            <td colSpan="1" style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
              {students.length}
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: 'green' }}>
              {totalPresent}
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: 'red' }}>
              {totalAbsent}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
