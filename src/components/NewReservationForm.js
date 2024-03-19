import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReservation } from '../actions/reservationActions';
import '../assets/css/newreservation.css';

const NewReservationForm = () => {
  const dispatch = useDispatch();
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

    fetchSpaceCws();
  }, [formData.user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value,
    }));

    if (name === 'space_cw_id') {
      const selectedSpaceCw = spaceCws.find((spaceCw) => spaceCw.id === parseInt(value, 10));
      if (selectedSpaceCw) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          city_id: selectedSpaceCw.city_id,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation(formData));
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
          required
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

        <input
          type="number"
          name="city_id"
          className="number"
          value={formData.city_id}
          onChange={handleChange}
          // placeholder="City Id:"
          readOnly
        />
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
    </div>
  );
};

export default NewReservationForm;
