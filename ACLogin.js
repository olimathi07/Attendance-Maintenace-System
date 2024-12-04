import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ACLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [acId, setAcId] = useState('');
  const [password, setPassword] = useState('');

  const handleCancel = () => {
    navigate('/'); // Navigate back to home if user cancels login
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Placeholder authentication for AC
    if (acId === '123456' && password === 'ac') {
      onLogin('ac'); // Set role as 'ac' for academic coordinator
      navigate('/ac-dashboard'); // Navigate to AC dashboard
    } else {
      alert('Invalid AC ID or Password');
    }
  };

  return (
    <div className="login-form">
      <h2>Academic Coordinator Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="acId">AC ID:</label>
          <input
            type="text"
            id="acId"
            name="acId"
            required
            value={acId}
            onChange={(e) => setAcId(e.target.value)}
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

export default ACLogin;
