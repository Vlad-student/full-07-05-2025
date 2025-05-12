import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllSports, fetchSportById } from "../api";

export const fetchSportByIdAsync = createAsyncThunk(
  "sports/fectchSportById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchSportById(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchAllSportsAsync = createAsyncThunk(
  "sports/fetchAllSports",
  async (values, thunkAPI) => {
    try {
      const response = await fetchAllSports();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const sportsSlice = createSlice({
  name: "sports",
  initialState: {
    sports: [],
    selectedSport: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSportsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllSportsAsync.fulfilled, (state, action) => {
      state.sports = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllSportsAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchSportByIdAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSportByIdAsync.fulfilled, (state, action) => {
      state.selectedSport = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchSportByIdAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default sportsSlice.reducer;
