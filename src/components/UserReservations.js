import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReservations, deleteReservation } from '../actions/reservationActions';

const UserReservations = ({ userId }) => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservation.reservations);
  console.log('Reservations:', reservations);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserReservations(userId));
    }
  }, [dispatch, userId]);

  const handleDelete = (reservationId) => {
    dispatch(deleteReservation(userId, reservationId));
  };

  return (
    <div>
      <h2>My Reservations</h2>
      <p>
        Reservations length:
        {reservations && reservations.length}
      </p>
      {reservations && reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              {/* <p>User ID: {reservation.user_id}</p> */}
              <p>
                Space Coworking Name:
                {reservation.space_cw_name}
              </p>

              <img
                src={reservation.space_cw_image}
                alt={reservation.space_cw_name}
              />

              <p>
                Date Reserved:
                {reservation.date_reserved}
              </p>

              <p>
                Start Date:
                {reservation.start_date}
              </p>

              <p>
                End Date:
                {reservation.end_date}
              </p>

              <p>
                City Name:
                {reservation.city_name}
              </p>

              <p>
                Comments:
                {reservation.comments}
              </p>

              <button
                type="button"
                onClick={() => handleDelete(reservation.user_id, reservation.id)}
              >
                Delete
              </button>

              <button
                type="button"
                onClick={() => handleDelete(reservation.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

UserReservations.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserReservations;
