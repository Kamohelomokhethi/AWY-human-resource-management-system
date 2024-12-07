import React, { useState } from 'react';
import {useSnackbar} from "notistack";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';

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

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await axios.post('http://localhost:5555/subscribe', formData)
        .then((response)=>{
          setIsLoading(false)
          navigate('/')
          enqueueSnackbar(response.data.message,{variant:'success'})
        });
      } catch (error) {
        console.error('There was an error!', error);
        enqueueSnackbar('Subscription failed.',{variant:'error'})
      }
      finally {
        setIsLoading(false)
    }
    };




        
  return (
    
<>
          <div className="form-container">
    {isLoading ? '<div className="animate-ping w-16 h-16 m-8 rounded-full bg-sky-600"></div>' : ''}
      <form onSubmit={handleSubmit}>
        <h2>Add member</h2>

        <div className="input-box">
          <input
            type="text"
            name="staffNumber"
            value={formData.staffNumber}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('staff_Number')}</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="fullNames"
            value={formData.fullNames}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('Full_names')}</label>
        </div>


        
        <div className="input-box">
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('id_Number')}</label>
        </div>


        <div className="input-box">
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('qualifications')}</label>
        </div>


        <div className="input-box">
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('position')}</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
          <label>{renderAnimatedLabel('salary')}</label>
        </div>

       

        <div className="input-box">
          <input disabled={isLoading} type="submit" value="ADD" />
        </div>
      </form>
    </div>

    </>
  );
};

export default Addmember;
