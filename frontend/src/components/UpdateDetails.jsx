import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const UpdateDetails = ({ studentId }) => {
      const { regNo } = useParams();

  const [student, setStudent] = useState({
    examDate: '',
    name: '',
    gender: '',
    address: '',
    birthday: '',
    birthplace: '',
    guardian: '',
    lastSchool: '',
    lastSchoolAddress: '',
    course1st: '',
    course2nd: '',
    transfereeCourse: '',
    english: '',
    filipino: '',
    math: '',
    science: '',
    socialstudies: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    // Fetch the student data
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/student/${regNo}`);
        const data = await response.json();
        
        // Set the state with fetched data (null fields will stay empty)
        if (response.ok) {
          setStudent({
            examDate: data.examDate || '',
            name: data.name || '',
            gender: data.gender || '',
            address: data.address || '',
            birthday: data.birthday || '',
            birthplace: data.birthplace || '',
            guardian: data.guardian || '',
            lastSchool: data.lastSchool || '',
            lastSchoolAddress: data.lastSchoolAddress || '',
            course1st: data.course1st || '',
            course2nd: data.course2nd || '',
            transfereeCourse: data.transfereeCourse || '',
            english: data.english || '',
            filipino: data.filipino || '',
            math: data.math || '',
            science: data.science || '',
            socialstudies: data.socialstudies || '',
          });
        } else {
          setErrorMessage('Error fetching student data');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setErrorMessage('An error occurred while fetching the data');
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        alert('Student data updated successfully!');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Failed to update student data.');
      }
    } catch (error) {
      console.error('Error updating student data:', error);
      setErrorMessage('An error occurred while updating the student data.');
    }
  };

  return (
    <div>
      <h1>Update Student Information</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(student).map((field) => (
          <div key={field}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              <input
                type="text"
                name={field}
                value={student[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
              />
            </label>
          </div>
        ))}
        <button type="submit">Update</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UpdateDetails;
