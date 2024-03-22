import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';

export const register = createAsyncThunk('auth/register', async ({
  name, email, password, passwordConfirmation, role,
}, thunkAPI) => {
  try {
    const response = await AuthService.register(name, email, password, passwordConfirmation, role);
    if (response.data) {
      // Handling local storage in Redux async thunk
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    localStorage.removeItem('user');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await AuthService.login(email, password);
    // Response.data contains the user and jwt token
    if (response.data) {
      // Handling local storage in Redux async thunk
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data; // This will update state based on the response
  } catch (error) {
    // Error handling, also clears local storage if login fails
    localStorage.removeItem('user');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await AuthService.logout();
    localStorage.removeItem('user');
    // No errors: dispatch the CLEAR_PERSISTED_STATE action
    thunkAPI.dispatch({ type: 'CLEAR_PERSISTED_STATE' });
    // Resolve the promise, signaling successful completion without specific data
    return null; // Explicitly return null to satisfy ESLint
  } catch (error) {
    // If there's an error, reject the promise and pass the error data
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Slice
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An unexpected error occurred';
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Failed to log in';
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
