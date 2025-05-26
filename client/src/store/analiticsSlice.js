import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAthletesBySport } from "../api";
import { pendCase, rejectedCase } from "./helpers";

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
  },
});

export default analiticsSlice.reducer;
