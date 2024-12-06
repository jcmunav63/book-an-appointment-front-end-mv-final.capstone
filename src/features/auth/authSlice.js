import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';

export const register = createAsyncThunk('auth/register', async ({
  name, email, password, passwordConfirmation, role,
}, thunkAPI) => {
  try {
    const response = await AuthService.register(name, email, password, passwordConfirmation, role);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.jwt); // Store token separately
    }
    return response.data;
  } catch (error) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await AuthService.login(email, password);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data)); // Store user info only, not token
    }
    return response.data;
  } catch (error) {
    localStorage.removeItem('user');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await AuthService.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove token on logout
    thunkAPI.dispatch({ type: 'CLEAR_PERSISTED_STATE' });
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null, // Retrieve token from localStorage
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.jwt; // Save token to state
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.jwt; // Save token to state
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null; // Clear token
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
