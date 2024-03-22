import axios from 'axios';

const API_URL = 'https://book-an-appointment-back-end-mv-final.onrender.com/';

const authService = {
  register: async (name, email, password, passwordConfirmation, role) => {
    const response = await axios.post(`${API_URL}signup`, {
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
    const response = await axios.post(`${API_URL}login`, {
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
