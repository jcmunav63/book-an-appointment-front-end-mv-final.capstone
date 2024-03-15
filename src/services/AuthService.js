import axios from 'axios';

const API_URL = 'http://localhost:3001/';

const register = (name, email, password, passwordConfirmation, role) => axios.post(`${API_URL}users`, {
  name,
  email,
  password,
  passwordConfirmation,
  role,
});

const login = (email, password) => axios
  .post(
    `${API_URL}users/sign_in`,
    { user: { email, password } }, // Data payload
    { headers: { 'Content-Type': 'application/json' } },
  )
  .then((response) => {
    if (response.data.jwt) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  })
  .catch((error) => {
    console.error('Login error:', error.response);
    throw error;
  });

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
