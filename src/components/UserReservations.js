import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchUserReservations, deleteReservation } from '../features/reservations/reservationsSlice';
import '../assets/css/UserReservations.css';
import API_BASE_URL from '../constants';

const UserReservations = ({ userId }) => {
  const dispatch = useDispatch();
  const { items: reservations, loading, error } = useSelector((state) => state.reservations);
  const [spaceCwNames, setSpaceCwNames] = useState({});
  const [cityNames, setCityNames] = useState({});
  const [fetchError, setFetchError] = useState(null);

  // Fetch reservations when the component mounts
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserReservations(userId));
    }
  }, [dispatch, userId]);

  // Fetch coworking space names
  useEffect(() => {
    const fetchSpaceCwNames = async () => {
      if (!reservations || reservations.length === 0) return;

      try {
        const names = {};
        await Promise.all(
          reservations.map(async (reservation) => {
            const response = await axios.get(
              `${API_BASE_URL}api/v1/space_cws/${reservation.space_cw_id}`,
              {
                withCredentials: true, // Use credentials (HTTPOnly cookies)
              },
            );
            names[reservation.id] = response.data.name;
          }),
        );
        setSpaceCwNames(names);
      } catch (err) {
        setFetchError('Error fetching coworking space names');
      }
    };

    fetchSpaceCwNames();
  }, [reservations]);

  // Fetch city names
  useEffect(() => {
    const fetchCityNames = async () => {
      if (!reservations || reservations.length === 0) return;

      try {
        const names = {};
        await Promise.all(
          reservations.map(async (reservation) => {
            const response = await axios.get(
              `${API_BASE_URL}api/v1/cities/${reservation.city_id}`,
              {
                withCredentials: true, // Use credentials (HTTPOnly cookies)
              },
            );
            names[reservation.id] = response.data.name;
          }),
        );
        setCityNames(names);
      } catch (err) {
        setFetchError('Error fetching city names');
      }
    };

    fetchCityNames();
  }, [reservations]);

  // Handle reservation deletion
  const handleDelete = (reservationId) => {
    dispatch(deleteReservation({ userId, reservationId }));
  };

  return (
    <div className="container">
      <div className="card-container">
        <h2>My Reservations</h2>
        <p className="p-center">
          Nr. of Reservations:&nbsp;
          {reservations?.length || 0}
        </p>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {fetchError && <p>{fetchError}</p>}
        <div>
          {reservations && reservations.length > 0 ? (
            <ul className="ul">
              {reservations.map((reservation) => (
                <li key={reservation.id} className="card">
                  <p>
                    Coworking Space Name:&nbsp;
                    <span className="strong">{spaceCwNames[reservation.id] || 'N/A'}</span>
                  </p>
                  <p>
                    Date Reserved:&nbsp;
                    <span className="strong">{reservation.date_reserved}</span>
                  </p>
                  <p>
                    Start Date:&nbsp;
                    <span className="strong">{reservation.start_date}</span>
                  </p>
                  <p>
                    End Date:&nbsp;
                    <span className="strong">{reservation.end_date}</span>
                  </p>
                  <p>
                    City Name:&nbsp;
                    <span className="strong">{cityNames[reservation.id] || 'N/A'}</span>
                  </p>
                  <p>
                    Comments:&nbsp;
                    <span className="strong">{reservation.comments}</span>
                  </p>
                  <div className="btn-container">
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

UserReservations.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserReservations;
