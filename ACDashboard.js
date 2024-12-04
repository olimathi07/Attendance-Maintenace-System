import React, { useEffect, useState } from 'react';

const ACDashboard = ({ onLogout }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [weeklySearchTerm, setWeeklySearchTerm] = useState('');
  const [showWeeklyAttendance, setShowWeeklyAttendance] = useState(false);

  useEffect(() => {
    // Mock data for student attendance
    setAttendanceData([
      {
        studentId: '22cs061',
        name: 'Olimathi',
        attendance: {
          period1: 'p',
          period2: 'p',
          period3: 'a',
          period4: 'p',
          period5: 'p',
          period6: 'a',
          period7: 'p',
        },
        weeklyAttendance: {
          ooose: 60,
          fsd: 80,
          pcd: 60,
          dl: 90,
          ui: 60,
          cc: 60,
        },
      },
      {
        studentId: '22cs069',
        name: 'Priya',
        attendance: {
          period1: 'a',
          period2: 'p',
          period3: 'p',
          period4: 'p',
          period5: 'a',
          period6: 'p',
          period7: 'a',
        },
        weeklyAttendance: {
          ooose: 80,
          fsd: 80,
          pcd: 60,
          dl: 60,
          ui: 70,
          cc: 90,
          
        },
      },
        {
          studentId: '22cs070',
          name: 'Ragav',
          attendance: {
            period1: 'p',
            period2: 'a',
            period3: 'p',
            period4: 'p',
            period5: 'a',
            period6: 'p',
            period7: 'p',
          },
          weeklyAttendance: {
            ooose: 80,
            fsd: 80,
            pcd: 70,
            dl: 60,
            ui: 90,
            cc: 60,
            
          },
        },
          {
            studentId: '22cs094',
            name: 'Sowbarnika',
            attendance: {
              period1: 'p',
              period2: 'p',
              period3: 'p',
              period4: 'p',
              period5: 'a',
              period6: 'p',
              period7: 'p',
            },
            weeklyAttendance: {
              ooose: 80,
              fsd: 80,
              pcd: 80,
              dl: 60,
              ui: 60,
              cc: 90,
              
            },
          },
            {
              studentId: '22cs101',
              name: 'Subha',
              attendance: {
                period1: 'a',
                period2: 'p',
                period3: 'p',
                period4: 'p',
                period5: 'p',
                period6: 'p',
                period7: 'p',
              },
              weeklyAttendance: {
                ooose: 80,
                fsd: 80,
                pcd: 70,
                dl: 60,
                ui: 90,
                cc: 60,
                
              },
            },
            {
              studentId: '22cs113',
              name: 'Vishnu',
              attendance: {
                period1: 'p',
                period2: 'p',
                period3: 'p',
                period4: 'p',
                period5: 'a',
                period6: 'p',
                period7: 'p',
              },
              weeklyAttendance: {
                ooose: 80,
                fsd: 80,
                pcd: 80,
                dl: 60,
                ui: 80,
                cc: 70,
                
              },
      },
    ]);
  }, []);

  // Filter students based on the search term for today's attendance
  const filteredData = attendanceData.filter((student) =>
    student.studentId.includes(searchTerm)
  );

  // Filter students based on the search term for weekly attendance
  const filteredWeeklyData = attendanceData.filter((student) =>
    student.name.toLowerCase().includes(weeklySearchTerm.toLowerCase()) ||
    student.studentId.includes(weeklySearchTerm)
  );

  // Function to close modal
  const closeModal = () => {
    setShowWeeklyAttendance(false);
  };

  // Helper function to calculate overall percentage
  const calculateOverall = (weeklyAttendance) => {
    const totalSubjects = Object.keys(weeklyAttendance).length;
    const totalAttendance = Object.values(weeklyAttendance).reduce((total, score) => total + score, 0);
    return (totalAttendance / totalSubjects).toFixed(2);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backdropFilter: 'blur(10px)',
        color: 'black',
      }}
    >
      <div
        style={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          width: '90%',
          maxWidth: '800px',
          position: 'relative',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Academic Coordinator Dashboard
        </h2>
        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>
          Today's Attendance Records
        </h3>

        {/* Search Box and Weekly Attendance Button Container */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
          <input
            type="text"
            placeholder="Search by Student ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '70%',
            }}
          />
          <button
            onClick={() => setShowWeeklyAttendance(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              alignSelf: 'center',
            }}
          >
            View Weekly Attendance
          </button>
        </div>
        

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              color: 'black',
              textAlign: 'center',
            }}
          >
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>OOSE</th>
                <th>OOSE</th>
                <th>OOSE</th>
                <th>OOSE</th>
                <th>UI/UX</th>
                <th>DL</th>
                <th>CC</th>
                <th>Total A</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((student) => {
                  const totalAbsentees = Object.values(student.attendance).filter(
                    (status) => status === 'a'
                  ).length;
                  return (
                    <tr key={student.studentId}>
                      <td>{student.studentId}</td>
                      <td>{student.name}</td>
                      {Object.keys(student.attendance).map((period, index) => (
                        <td
                          key={index}
                          style={{
                            color: student.attendance[period] === 'a' ? 'red' : 'green',
                          }}
                        >
                          {student.attendance[period].toUpperCase()}
                        </td>
                      ))}
                      <td style={{ color: 'red' }}>{totalAbsentees}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" style={{ padding: '10px' }}>
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showWeeklyAttendance && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              width: '80%',
              maxWidth: '600px',
            }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
              Weekly Attendance Summary
            </h3>

            <input
              type="text"
              placeholder="Search by Student Name or ID"
              value={weeklySearchTerm}
              onChange={(e) => setWeeklySearchTerm(e.target.value)}
              style={{
                marginBottom: '20px',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                width: '100%',
              }}
            />

<table
  style={{
    width: '100%', // Adjusted to take the full modal width
    borderCollapse: 'collapse',
    textAlign: 'center',
    fontSize: '14px', // Adjusted font size for better readability
  }}
>
  <thead>
    <tr>
      <th>Student ID</th>
      <th>Name</th>
      <th>OOSE</th>
      <th>FSD</th>
      <th>PCD</th>
      <th>UI/UX</th>
      <th>DL</th>
      <th>CC</th>
      <th>Overall</th>
    </tr>
  </thead>
  <tbody>
    {filteredWeeklyData.length > 0 ? (
      filteredWeeklyData.map((student) => {
        const { ooose, fsd, dl, pcd, ui, cc } = student.weeklyAttendance;
        const overall = calculateOverall(student.weeklyAttendance);

        return (
          <tr key={student.studentId}>
            <td style={{ padding: '5px' }}>{student.studentId}</td>
            <td style={{ padding: '5px' }}>{student.name}</td>
            <td style={{ padding: '5px' }}>{ooose.toFixed(2)}%</td>
            <td style={{ padding: '5px' }}>{fsd.toFixed(2)}%</td>
            <td style={{ padding: '5px' }}>{pcd.toFixed(2)}%</td>
            <td style={{ padding: '5px' }}>{dl.toFixed(2)}%</td>
            <td style={{ padding: '5px' }}>{ui.toFixed(2)}%</td>
            <td style={{ padding: '5px' }}>{cc.toFixed(2)}%</td>
            <td style={{ padding: '5px' }}>{overall}%</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="9" style={{ padding: '10px' }}>
          No students found
        </td>
      </tr>
    )}
  </tbody>
</table>

            <button
              onClick={closeModal}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#8B4513',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
        }}
        
      >
        
        Logout
      </button>
    </div>
  );
};

export default ACDashboard;
