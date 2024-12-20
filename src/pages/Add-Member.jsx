import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addmember = () => {
  // Form state
  const [formData, setFormData] = useState({
    staffNumber: '',
    fullNames: '',
    ID_number: '',
    qualifications: '',
    position: '',
    salary: '',
  });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const renderAnimatedLabel = (text) => {
    return text.split('').map((letter, i) => (
      <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
        {letter}
      </span>
    ));
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // API URL based on environment
    const apiUrl = 'https://hrms-server-euux.onrender.com/members' ; // Replace with your production URL

    try {
      const response = await axios.post(apiUrl, formData);
      enqueueSnackbar(response.data.message, { variant: 'success' });
      navigate('/members'); // Redirect to the homepage
    } catch (error) {
      console.error('There was an error!', error);
      // Display error message from backend if available
      const errorMessage = error.response?.data?.message || 'Subscription failed.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {isLoading && <div className="animate-ping w-16 h-16 m-8 rounded-full bg-sky-600"></div>}
      <form onSubmit={handleSubmit}>
        <h2>Add New Vehicle and Member</h2>

        

        {/* Member Fields */}
        <div className="input-box">
          <input
            type="number"
            name="staffNumber"
            value={formData.staffNumber}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('Staff Number')}</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="fullNames"
            value={formData.fullNames}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('Full Names')}</label>
        </div>

        <div className="input-box">
          <input
            type="number"
            name="ID_number"
            value={formData.ID_number}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('ID Number')}</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('Qualifications')}</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('Position')}</label>
        </div>

        <div className="input-box">
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('Salary')}</label>
        </div>

        <div className="input-box">
          <input disabled={isLoading} type="submit" value="ADD" />
        </div>
      </form>
    </div>
  );
};

export default Addmember;
