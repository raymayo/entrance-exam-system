import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Entrance = () => {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      const response = await fetch('http://localhost:5000/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regNo, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful
        alert('Login successful');
        // You can redirect or handle further after successful login
        navigate(`/student/details/${regNo}`);
      } else {
        // If login failed
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred while logging in.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Entrance Exam</h1>
        
        <label>
          Registration No.
          <input 
            type="text" 
            value={regNo} 
            onChange={(e) => setRegNo(e.target.value)} 
            required 
          />
        </label>
        
        <label>
          Password
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>

        <button type="submit">Enter</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Entrance;
