import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCreateAthlete, getAthleteById, updateAthleteById } from "../api";
import { pendCase, rejectedCase, fulfilledCase } from "./helpers";

export const updateAthleteByIdAsync = createAsyncThunk(
  "athletes/updateAthleteById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await updateAthleteById({ id, formData });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getAthleteByIdAsync = createAsyncThunk(
  "athletes/getAthleteById",
  async (id, thunkAPI) => {
    try {
      const response = await getAthleteById(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchCreateAthleteAsync = createAsyncThunk(
  "athletes/fetchCreateAthlete",
  async (formData, thunkAPI) => {
    try {
      const response = await fetchCreateAthlete(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const athleteSlice = createSlice({
  name: "athletes",
  initialState: {
    athletes: [],
    selectedAthlete: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAthleteByIdAsync.pending, pendCase);
    builder.addCase(getAthleteByIdAsync.fulfilled, fulfilledCase);
    builder.addCase(getAthleteByIdAsync.rejected, rejectedCase);

    builder.addCase(fetchCreateAthleteAsync.pending, pendCase);
    builder.addCase(fetchCreateAthleteAsync.fulfilled, fulfilledCase);
    builder.addCase(fetchCreateAthleteAsync.rejected, rejectedCase);

    builder.addCase(updateAthleteByIdAsync.pending, pendCase);
    builder.addCase(updateAthleteByIdAsync.fulfilled, fulfilledCase);
    builder.addCase(updateAthleteByIdAsync.rejected, rejectedCase);
  },
});

export default athleteSlice.reducer;
