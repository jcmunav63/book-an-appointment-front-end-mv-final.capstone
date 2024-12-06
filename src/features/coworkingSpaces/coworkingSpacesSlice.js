// coworkinfSpacesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../../constants';

// Async thunk to fetch coworking spaces
export const fetchCoworkingSpaces = createAsyncThunk(
  'coworkingSpaces/fetchCoworkingSpaces',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/v1/coworking_spaces`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = '/login'; // Redirect to login if unauthorized
      }
      return rejectWithValue(error.response?.data || 'Failed to fetch coworking spaces');
    }
  },
);

const coworkingSpacesSlice = createSlice({
  name: 'coworkingSpaces',
  initialState: {
    items: [], // List of coworking spaces
    loading: false, // Loading state for API calls
    error: null, // Error state for API failures
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoworkingSpaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoworkingSpaces.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Correctly update with the fetched data
      })
      .addCase(fetchCoworkingSpaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch coworking spaces';
      });
  },
});

export default coworkingSpacesSlice.reducer;
