import {
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_FAILURE,
  FETCH_USER_RESERVATIONS_REQUEST,
  FETCH_USER_RESERVATIONS_SUCCESS,
  FETCH_USER_RESERVATIONS_FAILURE,
  DELETE_RESERVATION_REQUEST,
  DELETE_RESERVATION_SUCCESS,
  DELETE_RESERVATION_FAILURE,
} from '../actions/reservationActions';

const initialState = {
  loading: false,
  reservations: [],
  reservation: null,
  error: null,
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RESERVATION_REQUEST:
    case DELETE_RESERVATION_REQUEST:
    case FETCH_USER_RESERVATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_RESERVATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: action.payload,
        error: null,
      };
    case DELETE_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: state.reservations.filter((reservation) => reservation.id !== action.payload),
        error: null,
      };
    case CREATE_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservation: action.payload,
        error: null,
      };
    case FETCH_USER_RESERVATIONS_FAILURE:
    case DELETE_RESERVATION_FAILURE:
    case CREATE_RESERVATION_FAILURE:
      return {
        ...state,
        loading: false,
        reservation: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reservationReducer;
