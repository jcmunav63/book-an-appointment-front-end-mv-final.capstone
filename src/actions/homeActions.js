import axios from 'axios';

export const FETCH_COWORKING_SPACES_REQUEST = 'FETCH_COWORKING_SPACES_REQUEST';
export const FETCH_COWORKING_SPACES_SUCCESS = 'FETCH_COWORKING_SPACES_SUCCESS';
export const FETCH_COWORKING_SPACES_FAILURE = 'FETCH_COWORKING_SPACES_FAILURE';

export const fetchCoworkingSpaces = () => async (dispatch) => {
  dispatch({ type: FETCH_COWORKING_SPACES_REQUEST });
  try {
    const response = await axios.get('http://127.0.0.1:3001/api/v1/users/1/space_cws');
    dispatch({
      type: FETCH_COWORKING_SPACES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COWORKING_SPACES_FAILURE,
      payload: error.message,
    });
  }
};
