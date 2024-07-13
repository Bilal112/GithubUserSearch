import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  loading: boolean;
  users: any[];
  error: string | null;
  searchQuery: string;
  userDetails: any | null;
  modalOpen: boolean;
}

const INITIAL_STATE: UserState = {
  loading: false,
  users: [],
  error: '',
  searchQuery: '',
  userDetails: null,
  modalOpen: false,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
      return response.data.items;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    closeModal(state) {
      state.modalOpen = false;
      state.userDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.modalOpen = true;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setSearchQuery, closeModal } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
