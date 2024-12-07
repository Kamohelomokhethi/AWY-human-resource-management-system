import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
  // Form state
  const [formData, setFormData] = useState({
    vin: '',
    model: '',
    mileage: '',
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

    console.log(formData)
    // API URL based on environment
    const apiUrl =  'https://hrms-server-euux.onrender.com/vehicles'; // Replace with your production URL

    try {
      const response = await axios.post(apiUrl, formData);
      enqueueSnackbar(response.data.message, { variant: 'success' });
      navigate('/'); // Redirect to the homepage
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

        {/* Vehicle Fields */}
        <div className="input-box">
          <input
            type="text"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('VIN')}</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('Model')}</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('Mileage')}</label>
        </div>

      

        <div className="input-box">
          <input disabled={isLoading} type="submit" value="ADD" />
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
