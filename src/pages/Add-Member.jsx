import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addmember = () => {
    
    // forms ========================================================================
    const [formData, setFormData] = useState({
      staffNumber: '',
      fullNames: '',
      idNumber: '',
      qualifications: '',
      position: '',
      salary: ''
    });
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    
    const renderAnimatedLabel = (text) => {
      return text.split('').map((letter, i) => (
        <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>{letter}</span>
      ));
    };
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5555/subscribe', formData);
      enqueueSnackbar(response.data.message, { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.error('There was an error!', error);
      enqueueSnackbar('Subscription failed.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {isLoading && <div className="animate-ping w-16 h-16 m-8 rounded-full bg-sky-600"></div>}
      <form onSubmit={handleSubmit}>
        <h2>Add New Vehicle</h2>

        <div className="input-box">
          <input
            type="text"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('vin')}</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('model')}</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('mileage')}</label>
        </div>

        <div className="input-box">
          <input disabled={isLoading} type="submit" value="ADD" />
        </div>
      </form>
    </div>
  );
};

export default Addmember;
