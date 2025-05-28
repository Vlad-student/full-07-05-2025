import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAthletesBySport,
  fetchAthletesByCountry,
  fetchSportsByCountry,
} from "../api";
import { pendCase, rejectedCase } from "./helpers";

export const fetchSportsByCountryAsync = createAsyncThunk(
  "analitics/fetchSportsByCountry",
  async (_, thunkAPI) => {
    try {
      const response = await fetchSportsByCountry();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchAthletesByCountryAsync = createAsyncThunk(
  "analitics/fetchAthletesByCountry",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAthletesByCountry();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchAthletesBySportAsync = createAsyncThunk(
  "analitics/fetchAthletesBySport",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAthletesBySport();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const analiticsSlice = createSlice({
  name: "analitics",
  initialState: {
    isLoading: false,
    error: null,
    athletesBySport: [],
    athletesByCountry: [],
    sportsByCountry: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAthletesBySportAsync.pending, pendCase);
    builder.addCase(fetchAthletesBySportAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.athletesBySport = action.payload;
    });
    builder.addCase(fetchAthletesBySportAsync.rejected, rejectedCase);

    builder.addCase(fetchAthletesByCountryAsync.pending, pendCase);
    builder.addCase(fetchAthletesByCountryAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.athletesByCountry = action.payload;
    });
    builder.addCase(fetchAthletesByCountryAsync.rejected, rejectedCase);

    builder.addCase(fetchSportsByCountryAsync.pending, pendCase);
    builder.addCase(fetchSportsByCountryAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.sportsByCountry = action.payload;
    });
    builder.addCase(fetchSportsByCountryAsync.rejected, rejectedCase);
  },
});

export default analiticsSlice.reducer;
