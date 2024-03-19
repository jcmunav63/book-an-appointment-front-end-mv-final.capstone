import axios from 'axios';

export const CREATE_RESERVATION_REQUEST = 'CREATE_RESERVATION_REQUEST';
export const CREATE_RESERVATION_SUCCESS = 'CREATE_RESERVATION_SUCCESS';
export const CREATE_RESERVATION_FAILURE = 'CREATE_RESERVATION_FAILURE';

export const createReservationRequest = () => ({
  type: CREATE_RESERVATION_REQUEST,
});

export const createReservationSuccess = (reservation) => ({
  type: CREATE_RESERVATION_SUCCESS,
  payload: reservation,
});

export const createReservationFailure = (error) => ({
  type: CREATE_RESERVATION_FAILURE,
  payload: error,
});

export const createReservation = (reservationData) => async (dispatch) => {
  dispatch(createReservationRequest());
  try {
    const response = await axios.post('http://localhost:3001/api/v1/users/:user_id/reservations', { reservation: reservationData });
    dispatch(createReservationSuccess(response.data));
  } catch (error) {
    dispatch(createReservationFailure(error.message));
  }
};
