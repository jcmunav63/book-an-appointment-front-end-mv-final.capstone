import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createReservation } from '../actions/reservationActions';
import '../assets/css/newreservation.css';

const NewReservationForm = () => {
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_id: '',
    space_cw_id: '',
    date_reserved: '',
    date_cancelled: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    city_id: '',
    comments: '',
  });

  const [spaceCws, setSpaceCws] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))?.user.id;
  const [cities, setCities] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSpaceCws = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/users/${formData.user_id}/space_cws`);
        setSpaceCws(response.data);
        const cityIds = response.data.map((spaceCw) => spaceCw.city_id);
        setFormData((prevFormData) => ({
          ...prevFormData,
          city_id: cityIds[0] || '',
        }));
      } catch (error) {
        console.error('Error fetching Space_cws:', error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchSpaceCws();
    fetchCities();
  }, [formData.user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      user_id: userId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(createReservation(formData));
    try {
      await axios.post('http://localhost:3001/api/v1/users/:user_id/reservations', formData);
      setSuccessMessage('Reservation created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // 5 seconds
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating reservation:', error);
      setErrorMessage('Error creating reservation. Please try again later.');
      setTimeout(() => {
        setErrorMessage('');
      }, 8000); // 8 seconds
      setSuccessMessage('');
    }
  };

  return (
    <div id="main-div">
      <h2>Create a New Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="user_id"
          className="number"
          value={formData.user_id}
          onChange={handleChange}
          placeholder="User Id:"
          readOnly
        />
        <br />

        <select
          name="space_cw_id"
          className="dropdown_list"
          value={formData.space_cw_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a Space_cw</option>
          {spaceCws.map((spaceCw) => (
            <option key={spaceCw.id} value={spaceCw.id}>
              {spaceCw.name}
            </option>
          ))}
        </select>
        <br />

        <input
          type="date"
          name="date_reserved"
          className="date"
          value={formData.date_reserved}
          onChange={handleChange}
          placeholder="Date Reserved:"
          required
        />
        <br />

        <input
          type="date"
          name="date_cancelled"
          className="date"
          value={formData.date_cancelled}
          onChange={handleChange}
          placeholder="Date Cancelled:"
        />
        <br />

        <input
          type="date"
          name="start_date"
          className="date"
          value={formData.start_date}
          onChange={handleChange}
          placeholder="Start Date:"
          required
        />
        <br />

        <input
          type="date"
          name="end_date"
          className="date"
          value={formData.end_date}
          onChange={handleChange}
          placeholder="Start Date:"
          required
        />
        <br />

        <input
          type="time"
          name="start_time"
          className="time"
          value={formData.start_time}
          onChange={handleChange}
          placeholder="Start TIme:"
          required
        />
        <br />

        <input
          type="time"
          name="end_time"
          className="time"
          value={formData.end_time}
          onChange={handleChange}
          placeholder="End TIme:"
          required
        />
        <br />

        <select name="city_id" value={formData.city_id} onChange={handleChange}>
          <option value="">Select a City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
        <br />

        <input
          type="textarea"
          name="comments"
          className="text-area"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Comments:"
          rows="3"
          required
        />
        <br />

        <button
          type="submit"
          className="new-reserve-btn"
        >
          Create Reservation
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default NewReservationForm;
