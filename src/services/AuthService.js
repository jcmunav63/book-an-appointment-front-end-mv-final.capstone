import axios from 'axios';

const API_URL = 'http://localhost:3001/';

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
    console.log('Full response:', response);
    console.log('This is data', response.data);
    return response;
  },

  logout: async () => Promise.resolve(),
};

export default authService;
