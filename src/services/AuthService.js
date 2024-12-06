import axios from 'axios';
import API_BASE_URL from '../constants';

// Axios global configuration
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // Ensure cookies are sent
axios.defaults.headers.common['Content-Type'] = 'application/json';

const authService = {
  register: async (name, email, password, passwordConfirmation, role) => {
    const response = await axios.post(
      `${API_BASE_URL}signup`,
      {
        user: {
          name, email, password, passwordConfirmation, role,
        },
      },
    );
    return response;
  },

  login: async (email, password) => {
    const response = await axios.post(
      `${API_BASE_URL}login`,
      { user: { email, password } },
    );
    return response;
  },

  logout: async () => {
    const response = await axios.delete(`${API_BASE_URL}/logout`);
    return response;
  },
};

export default authService;
