import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TakeAttendance = () => {
  // State for student and status selection
  const [student, setStudent] = useState('');
  const [status, setStatus] = useState('');

  // Dummy student list and status options for demonstration
  const studentOptions = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Sam Wilson' },
  ];

  const statusOptions = ['Present', 'Absent', 'Late'];

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student:', student);
    console.log('Status:', status);

    // Add your logic to handle form submission (e.g., send data to the backend)
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Mark Student Attendance</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="studentSelect" className="form-label">Select Student</label>
          <select
            id="studentSelect"
            className="form-select"
            value={student}
            onChange={(e) => setStudent(e.target.value)} // Handle student selection
          >
            <option value="">-- Select a student --</option>
            {studentOptions.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="statusSelect" className="form-label">Attendance Status</label>
          <select
            id="statusSelect"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)} // Handle status selection
          >
            <option value="">-- Select status --</option>
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit Attendance</button>
      </form>
    </div>
  );
};

export default TakeAttendance;
