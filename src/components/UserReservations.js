import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReservations, deleteReservation } from '../actions/reservationActions';

const UserReservations = ({ userId }) => {
  const dispatch = useDispatch();
  const reservations = useSelector(state => state.reservations);

  useEffect(() => {
    dispatch(fetchUserReservations(userId));
  }, [dispatch, userId]);

  const handleDelete = (reservationId) => {
    dispatch(deleteReservation(userId, reservationId));
  };

  return (
    <div>
      <h2>User Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {/* <p>User ID: {reservation.user_id}</p> */}
            <p>Space Coworking Name: {reservation.space_cw_name}</p>
            <img src={reservation.space_cw_image} alt={reservation.space_cw_name} />
            <p>Date Reserved: {reservation.date_reserved}</p>
            <p>Start Date: {reservation.start_date}</p>
            <p>End Date: {reservation.end_date}</p>
            <p>City Name: {reservation.city_name}</p>
            <p>Comments: {reservation.comments}</p>
            <button onClick={() => handleDelete(reservation.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReservations;
