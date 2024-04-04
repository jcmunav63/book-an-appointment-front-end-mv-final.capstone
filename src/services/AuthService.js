import axios from 'axios';
import API_BASE_URL from '../constants';

const authService = {
  register: async (name, email, password, passwordConfirmation, role) => {
    const response = await axios.post(`${API_BASE_URL}signup`, {
      user: {
        name,
        email,
        password,
        passwordConfirmation,
        role,
      },
    }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}login`, {
      user: {
        email,
        password,
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  },

  logout: async () => Promise.resolve(),
};

export default authService;
