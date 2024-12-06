import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../../constants';

// Async thunk to create a reservation
export const createReservation = createAsyncThunk(
  'reservations/create',
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/v1/users/:user_id/reservations`,
        { reservation: reservationData },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to fetch user reservations
export const fetchUserReservations = createAsyncThunk(
  'reservations/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/v1/users/${userId}/reservations`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to delete a reservation
export const deleteReservation = createAsyncThunk(
  'reservations/delete',
  async ({ userId, reservationId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}api/v1/users/${userId}/reservations/${reservationId}`);
      return reservationId; // Return the ID of the deleted reservation
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Create reservations slice
const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    items: [], // List of reservations
    loading: false, // Loading state for API calls
    error: null, // Error state for API failures
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createReservation actions
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // Add the new reservation to the state
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchUserReservations actions
      .addCase(fetchUserReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Populate reservations from the API
      })
      .addCase(fetchUserReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle deleteReservation actions
      .addCase(deleteReservation.fulfilled, (state, action) => {
        // eslint-disable-next-line max-len
        state.items = state.items.filter((res) => res.id !== action.payload); // Remove deleted reservation
      });
  },
});

export default reservationsSlice.reducer;
