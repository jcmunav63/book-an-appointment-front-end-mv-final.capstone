import {
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_FAILURE,
} from '../actions/reservationActions';

const initialState = {
  loading: false,
  reservation: null,
  error: null,
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RESERVATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservation: action.payload,
        error: null,
      };
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
